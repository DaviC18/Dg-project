// biome-ignore assist/source/organizeImports: <>
import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { z } from "zod";
import { form } from "../../db/schema/form";

export const createForm: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/protected",
		{
			schema: {
				body: z.object({
					symptomsDescription: z.string().min(1),
					startDate: z.string(),
					symptomsStatus: z.string(),
					painLevel: z.coerce.number().int().min(0).max(10),
					hadBefore: z.string(),
					hadBeforeWhen: z.string().nullable().optional(),
					seenByProfessional: z.string(),
					seenByWho: z.string().nullable().optional(),
					consent: z.boolean(),
				}),
			},
		},
		async (request, reply) => {
			const { userId } = getAuth(request);

			if (!userId) {
				return reply.code(401).send({ error: "Not authenticated" });
			}

			const {
				symptomsDescription,
				startDate,
				symptomsStatus,
				painLevel,
				hadBefore,
				hadBeforeWhen,
				seenByProfessional,
				seenByWho,
				consent,
			} = request.body;

			await db.insert(form).values({
				userId,
				symptomsDescription,
				startDate,
				symptomsStatus,
				painLevel,
				hadBefore,
				hadBeforeWhen,
				seenByProfessional,
				seenByWho,
				consent,
			});

			return reply.code(201).send({ message: "Form saved successfully" });
		}
	);
};
