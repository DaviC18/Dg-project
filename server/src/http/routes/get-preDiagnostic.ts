/** biome-ignore-all lint/complexity/noUselessCatchBinding: <> */
import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";

export const getPreDiagnostic: FastifyPluginCallbackZod = (app) => {
	app.get("/pre-diagnostics", async (request, reply) => {
		const { userId } = getAuth(request);

		if (!userId) {
			return reply.code(401).send({ error: "Not authenticated" });
		}

		try {
			const resultPreDiagnostic = await db.query.preDiagnostics.findMany({
				where: (p, { eq }) => eq(p.userId, userId),
				orderBy: (p, { desc }) => desc(p.createdAt),
			});
			return reply.status(200).send(resultPreDiagnostic);
		} catch (_error) {
			console.error("ERROR TO GET THE PRE DIAGNOSTIC");
			reply.code(501).send({ error: "Error to get the pre diagnostic" });
		}
	});
};
