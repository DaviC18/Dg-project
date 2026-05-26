/** biome-ignore-all lint/style/useFilenamingConvention: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
import { preDiagnostics } from "../../db/schema/preDiagnostics";
import { z } from "zod";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { getAuth } from "@clerk/fastify";
import { PreDiagnostic } from "../../services/gemini";
import { forms } from "../../db/schema/forms";
import { eq } from "drizzle-orm";

const bodySchema = z.object({
	formId: z.string().min(1),
});

const MODEL = "gemini-3-flash-preview";

export const createPreDiagnostic: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/pre-diagnostics",
		{ schema: { body: bodySchema } },
		async (request, reply) => {
			const { userId } = getAuth(request);

			const { formId } = bodySchema.parse(request.body);

			if (!userId) {
				return reply.code(401).send({ error: "Not authenticated" });
			}

			await db
				.update(forms)
				.set({
					analysisStatus: "pending",
				})
				.where(eq(forms.id, formId));

			const form = await db.query.forms.findFirst({
				where: (f, { eq, and }) => and(eq(f.id, formId), eq(f.userId, userId)),
			});

			if (!form) {
				return reply.code(404).send({ error: "Form not found" });
			}

			const existing = await db.query.preDiagnostics.findFirst({
				where: (p, { eq }) => eq(p.formId, formId),
			});

			if (existing) {
				return reply
					.code(409)
					.send({ message: "Pre Diagnostic already exitis" });
			}

			await db
				.update(forms)
				.set({
					analysisStatus: "processing",
				})
				.where(eq(forms.id, formId));

			try {
				const iaResults = await PreDiagnostic(form);

				const [preDiagnostic] = await db
					.insert(preDiagnostics)
					.values({
						userId,
						formId,
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

				return reply.code(201).send(preDiagnostic);
			} catch (error) {
				console.error("ERROR TO GET THE PRE DIAGNOSTIC:", error);

				await db
					.update(forms)
					.set({
						analysisStatus: "failed",
					})
					.where(eq(forms.id, formId));

				return reply
					.code(500)
					.send({ error: "Error to get the pre diagnostic" });
			}
		}
	);
};
