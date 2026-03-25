// biome-ignore assist/source/organizeImports: <>
import bcrypt from "bcryptjs";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../db/connections";
import { users } from "../../db/schema/users";
import { eq } from "drizzle-orm";

const CreateUserBody = z.object({
	name: z.string().min(1),
	cpf: z.string().length(11),
	age: z.string().length(8),
	email: z.string().email(),
	password: z.string().min(6),
	role: z.enum(["pacient", "doctor"]),
});

const LoginBody = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

// biome-ignore lint/suspicious/useAwait: <promisse>
export const authRoutes: FastifyPluginAsyncZod = async (app) => {
	app.post("/signup", async (request, reply) => {
		const parse = CreateUserBody.safeParse(request.body);
		if (!parse.success) {
			return reply.status(400).send({ error: parse.error });
		}

		const { name, biagerth, cpf, email, password, role } = parse.data;
		const passwordHash = await bcrypt.hash(password, 10);

		function calcAge(dateBirth: Date) {
			const today = new Date()
			let age = today.getFullYear() - dateBirth.getFullYear()

			const getMonth = today.getMonth()
			const getDay = today.getDate();

			const monthBirth = dateBirth.getMonth();
			const dayBirth = dateBirth.getDate()

			if(getMonth < monthBirth || (getMonth === monthBirth && getDay < dayBirth)) age--

			return age
		}
		try {
			const result = await db
				.insert(users)
				.values({
					name,
					cpf,
					age: calcAge(birth),
					email,
					password: passwordHash,
					role,
				})
				.returning();

			const inserted = result[0];
			return reply
				.status(201)
				.send({ id: inserted.id, create_at: inserted.createdAt });
		} catch (err) {
			return reply
				.status(409)
				.send({ error: "email pr cpf already exists", details: err });
		}
	});

	// biome-ignore lint/suspicious/useAwait: <Promisse>
	app.post("/login", async (request, reply) => {
		const parse = LoginBody.safeParse(request.body);
		if (!parse.success) {
			return reply.status(400).send({ error: parse.error });
		}

		const { email, password } = parse.data;

		const rows = await db.select().from(users).where(eq(users.email, email));

		const user = rows[0];

		if (!user) {
			return reply.status(401).send({ error: "Invalid Credentials" });
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return reply.status(401).send({ error: "Invalid Credentials" });
		}

		const token = app.jwt.sign({ userId: user.id, role: user.role });

		return reply.send({ token, role: user.role });
	});
};
