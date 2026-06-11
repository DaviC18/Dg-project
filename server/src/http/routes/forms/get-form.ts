/** biome-ignore-all lint/complexity/noUselessCatchBinding: <> */
import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../../db/connections";

export const getForm: FastifyPluginCallbackZod = (app) => {
	app.get("/forms", async (request, reply) => {
		const { userId } = getAuth(request);
		const startedAt = Date.now();

		if (!userId) {
			request.log.warn({ event: "unauthorized_form_access" });
			return reply.code(401).send({ error: "Not authenticated" });
		}

		request.log.info({ event: "form_accessing", userId });

		try {
			const resultForms = await db.query.forms.findMany({
				where: (f, { eq }) => eq(f.userId, userId),
				with: {
					preDiagnostics: true, // 🔥 join automático
				},
				orderBy: (f, { desc }) => desc(f.createdAt),
			});

			request.log.info({
				event: "form_accessed",
				userId,
				durationMs: Date.now() - startedAt,
			});

			return reply.status(200).send(resultForms);
		} catch (err) {
			request.log.error({
				event: "form_not_accessed",
				userId,
				durationMs: Date.now() - startedAt,
				error: err,
			});
			return reply.code(500).send({ err: "Error to get the form" });
		}
	});
};
