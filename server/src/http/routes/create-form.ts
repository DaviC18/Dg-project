// biome-ignore assist/source/organizeImports: <>
import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { z } from "zod";
import { forms } from "../../db/schema/forms";

const bodySchema = z.object({
	symptomsDescription: z.string().min(1),
	startDate: z.string(),
	symptomsStatus: z.string(),
	painLevel: z.coerce.number().int().min(0).max(10),
	hadBefore: z.string(),
	hadBeforeWhen: z.string().nullable().optional(),
	seenByProfessional: z.string(),
	seenByWho: z.string().nullable().optional(),
	consent: z.boolean(),
});

export const createForm: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/forms",
		{
			schema: {
				body: bodySchema,
			},
		},
		async (request, reply) => {
			const { userId } = getAuth(request);

			const data = bodySchema.parse(request.body);

			if (!userId) {
				return reply.code(401).send({ error: "Not authenticated" });
			}

			const { consent } = data;

			if (!consent) {
				return reply.send({
					message: "Consent is required to generate the preliminary diagnosis.",
				});
			}

			try {
				const [form] = await db
					.insert(forms)
					.values({
						...data,
						userId,
					})
					.returning();

				return reply.code(201).send(form);
			} catch (err) {
				console.error("ERRO TO INSERT THE PRE FORM: ", err);
				return reply.code(500).send({
					err: "Failed to insert pre form",
				});
			}
		}
	);
};
