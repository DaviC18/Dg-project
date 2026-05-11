/** biome-ignore-all assist/source/organizeImports: <> */

import { getAuth } from "@clerk/fastify";
import { z } from "zod";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { PreDiagnostic } from "../../services/gemini";
import { preDiagnostics } from "../../db/schema/preDiagnostics";

const bodySchema = z.object({
	formId: z.string().min(10),
	model: z.string().min(1),
});

export const createPreDiagnostic: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/pre-diagnostics",
		{
			schema: {
				body: bodySchema,
			},
		},
		async (request, reply) => {
			const { userId } = getAuth(request);
			const { formId, model } = bodySchema.parse(request.body);

			if (!userId) {
				return reply.code(401).send({ error: "Not authenticated" });
			}

			const form = await db.query.forms.findFirst({
				where: (f, { eq, and }) => and(eq(f.id, formId), eq(f.userId, userId)),
			});

			if (!form) {
				return reply.code(401).send({ error: "Form not find" });
			}

			const existing = await db.query.preDiagnostics.findFirst({
				where: (p, { eq }) => eq(p.formId, formId),
			});

			if (existing) {
				return reply
					.code(401)
					.send({ message: "the pre-diagnostis's existing" });
			}

			const iaResults = await PreDiagnostic(form);

			try {
				const [preDiagnostic] = await db
					.insert(preDiagnostics)
					.values({ userId, formId, model, result: iaResults })
					.returning();

				return reply.code(201).send(preDiagnostic);
			} catch (err) {
				console.error("ERRO TO INSERT THE PRE DIAGNOSTIC: ", err);
				return reply.code(500).send({
					err: "Failed to insert pre diagnostic",
				});
			}
		}
	);
};
