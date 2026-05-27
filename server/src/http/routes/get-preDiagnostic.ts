/** biome-ignore-all lint/complexity/noUselessCatchBinding: <> */
import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";

export const getPreDiagnostic: FastifyPluginCallbackZod = (app) => {
	app.get("/pre-diagnostics", async (request, reply) => {
		const { userId } = getAuth(request);
		const startedAt = Date.now();

		if (!userId) {
			request.log.warn({
				event: "unauthorized_prediagnostic_access",
			});
			return reply.code(401).send({ error: "Not authenticated" });
		}

		request.log.info({
			event: "prediagnoscitc_accessing",
			userId,
		});

		try {
			const resultPreDiagnostic = await db.query.preDiagnostics.findMany({
				where: (p, { eq }) => eq(p.userId, userId),
				with: { form: true },
				orderBy: (p, { desc }) => desc(p.createdAt),
			});

			request.log.info({
				event: "prediagnostic_accessed",
				userId,
				durationMs: Date.now() - startedAt,
			});

			return reply.status(200).send(resultPreDiagnostic);
		} catch (err) {
			request.log.error({
				event: "prediagnostic_not_accessed",
				userId,
				durationMs: Date.now() - startedAt,
				error: err,
			});
			return reply.code(500).send({ err: "Error to get the pre diagnostic" });
		}
	});
};
