/** biome-ignore-all lint/style/useFilenamingConvention: <> */
/** biome-ignore-all assist/source/organizeImports: <> */

import { getAuth } from "@clerk/fastify";
import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "../../../db/connections";
import { forms } from "../../../db/schema/forms";
import { preDiagnostics } from "../../../db/schema/preDiagnostics";
import { PreDiagnostic } from "../../../services/gemini";

const bodySchema = z.object({
	formId: z.string().uuid(),
});

const MODEL = "gemini-3-flash-preview";

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
			const startedAt = Date.now();

			if (!userId) {
				request.log.warn({
					event: "unauthorized_prediagnostic_creation",
				});

				return reply.code(401).send({
					error: "Not authenticated",
				});
			}

			const { formId } = bodySchema.parse(request.body);

			const form = await db.query.forms.findFirst({
				where: (f, { eq, and }) => and(eq(f.id, formId), eq(f.userId, userId)),
			});

			if (!form) {
				request.log.warn({
					event: "form_not_found",
					userId,
					formId,
				});

				return reply.code(404).send({
					error: "Form not found",
				});
			}

			const existing = await db.query.preDiagnostics.findFirst({
				where: (p, { eq }) => eq(p.formId, formId),
			});

			if (existing) {
				request.log.warn({
					event: "pre_diagnostic_already_exists",
					userId,
					formId,
				});

				return reply.code(409).send({
					error: "Pre-diagnostic already exists",
				});
			}

			await db
				.update(forms)
				.set({
					analysisStatus: "processing",
				})
				.where(eq(forms.id, formId));

			request.log.info({
				event: "prediagnostic_creation_start",
				userId,
				formId,
			});

			try {
				const iaResults = await PreDiagnostic(form);

				const [preDiagnostic] = await db
					.insert(preDiagnostics)
					.values({
						userId,
						formId,
						title: iaResults.title,
						model: MODEL,
						result: iaResults,
					})
					.returning();

				await db
					.update(forms)
					.set({
						analysisStatus: "success",
					})
					.where(eq(forms.id, formId));

				request.log.info({
					event: "prediagnostic_created",
					userId,
					formId,
					durationMs: Date.now() - startedAt,
				});

				return reply.code(201).send(preDiagnostic);
			} catch (err) {
				await db
					.update(forms)
					.set({
						analysisStatus: "failed",
					})
					.where(eq(forms.id, formId));

				request.log.error({
					event: "prediagnostic_creation_failed",
					userId,
					formId,
					durationMs: Date.now() - startedAt,
					error: err,
				});

				return reply.code(500).send({
					error: "Failed to create pre-diagnostic",
				});
			}
		}
	);
};
