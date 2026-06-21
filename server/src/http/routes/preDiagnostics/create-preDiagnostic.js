/** biome-ignore-all lint/style/useFilenamingConvention: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
import { getAuth } from "@clerk/fastify";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../../db/connections";
import { preDiagnostics } from "../../../db/schema/preDiagnostics";
import { PreDiagnostic } from "../../../services/gemini";
const bodySchema = z.object({
    formId: z.string().uuid(),
});
const MODEL = "gemini-3-flash-preview";
export const createPreDiagnostic = (app) => {
    app.post("/pre-diagnostics", {
        schema: {
            body: bodySchema,
        },
    }, async (request, reply) => {
        const startedAt = Date.now();
        const { userId } = getAuth(request);
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
            .update(preDiagnostics)
            .set({
            analysisStatus: "processing",
        })
            .where(eq(preDiagnostics.formId, formId));
        request.log.info({
            event: "prediagnostic_creation_start",
            userId,
            formId,
        });
        try {
            const iaResults = await PreDiagnostic(form);
            const [createdPreDiagnostic] = await db
                .insert(preDiagnostics)
                .values({
                userId,
                formId,
                title: iaResults.title,
                urgencyLevel: iaResults.urgencyLevel,
                model: MODEL,
                result: iaResults,
                analysisStatus: "success",
            })
                .returning();
            await db
                .update(preDiagnostics)
                .set({
                analysisStatus: "success",
            })
                .where(eq(preDiagnostics.formId, formId));
            request.log.info({
                event: "prediagnostic_created",
                userId,
                formId,
                durationMs: Date.now() - startedAt,
            });
            return reply.code(201).send(createdPreDiagnostic);
        }
        catch (err) {
            await db
                .update(preDiagnostics)
                .set({
                analysisStatus: "failed",
            })
                .where(eq(preDiagnostics.formId, formId));
            await db
                .update(preDiagnostics)
                .set({
                analysisStatus: "failed",
            })
                .where(eq(preDiagnostics.formId, formId));
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
    });
};
