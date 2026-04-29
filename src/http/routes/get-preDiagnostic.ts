import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { preDiagnostic } from "../../db/schema/preDiagnostic";
import { eq } from "drizzle-orm";

export const getPreDiagnostic: FastifyPluginCallbackZod = (app) => {
	app.get("/pre-diagnostic", async (request, reply) => {
		const { userId } = getAuth(request);

		if (!userId) {
			return reply.code(401).send({ error: "Not authenticated" });
		}

		const preDiagnostics = await db
			.select()
			.from(preDiagnostic)
			.where(eq(preDiagnostic.userId, userId));

		return reply.send(preDiagnostics);
	});
};
