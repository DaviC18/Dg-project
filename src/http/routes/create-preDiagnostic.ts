import { getAuth } from "@clerk/fastify";
import { z } from "zod";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { preDiagnostic } from "../../db/schema/preDiagnostic";

export const createPreDiagnostic: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/pre-diagnostic",
		{
			schema: {
				body: z.object({
					formId: z.string().min(1),
					model: z.string().min(1),
					result: z.object({
						summary: z.string(),
						alerts: z.string(),
						suggestionsToTheDoctor: z.string(),
						examsSuggested: z.string(),
						observations: z.string(),
					}),
				}),
			},
		},
		async (request, reply) => {
			const { userId } = getAuth(request);

			if (!userId) {
				return reply.code(401).send({ error: "Not authenticated" });
			}

			const { model, result, formId } = request.body;

			await db.insert(preDiagnostic).values({
				formId,
				userId,
				model,
				result,
			});

			return reply.code(201).send({
				message: "Pre diagnostic saved successfully",
			});
		}
	);
};
