import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { form } from "../../db/schema/form";
import { eq } from "drizzle-orm";

export const getForm: FastifyPluginCallbackZod = (app) => {
	app.get("/protected", async (request, reply) => {
		const { userId } = getAuth(request);

		if (!userId) {
			return reply.code(401).send({ error: "Not authenticated" });
		}

		const forms = await db.select().from(form).where(eq(form.userId, userId));

		return reply.send(forms);
	});
};
