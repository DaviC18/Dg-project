import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { users } from "../../db/schema/users";

// biome-ignore lint/suspicious/useAwait: <async>
export const getDoctorUser: FastifyPluginAsyncZod = async (app) => {
	app.get("/user_doctor", async () => {
			const rows = await db
				.select({
					id: users.id,
					name: users.name,
					cpf: users.cpf,
					email: users.email,
					created_at: users.createdAt,
				})
				.from(users)
				.where(eq(users.role, "pacient"))
				.orderBy(users.createdAt);
			return rows;
		});
};
