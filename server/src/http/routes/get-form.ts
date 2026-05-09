import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";

export const getForm: FastifyPluginCallbackZod = (app) => {
	app.get("/forms", async (request, reply) => {
		const { userId } = getAuth(request);

		if (!userId) {
			return reply.code(401).send({ error: "Not authenticated" });
		}

		try {
			const resultForms = await db.query.forms.findMany({
			where: (f, { eq }) => eq(f.userId, userId),
			with: {
				preDiagnostics: true, // 🔥 join automático
			},
			orderBy: (f, { desc }) => desc(f.createdAt),
		});
		return reply.status(200).send(resultForms);
		} catch (err){
			console.error("ERROR TO GET THE FORM")
			reply.code(501).send({err: "Error to get the form"})
		}
	});
};
