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
  title: z.string().min(1).max(80),
  formId: z.string().min(1),
});

const MODEL = "gemini-3-flash-preview";

export const createPreDiagnostic: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/pre-diagnostics",
    { schema: { body: bodySchema } },
    async (request, reply) => {
      const { userId } = getAuth(request);
      const startedAt = Date.now();

      const { formId } = bodySchema.parse(request.body);

      if (!userId) {
        request.log.warn({
          event: "unauthorized_prediagnostic_creation",
        });
        return reply.code(401).send({ error: "Not authenticated" });
      }

      const form = await db.query.forms.findFirst({
        where: (f, { eq, and }) => and(eq(f.id, formId), eq(f.userId, userId)),
      });

      if (!form) {
        request.log.warn({ event: "form_not_found", userId, formId });
        return reply.code(404).send({ error: "Form not found" });
      }

      const existing = await db.query.preDiagnostics.findFirst({
        where: (p, { eq }) => eq(p.formId, formId),
      });

      if (existing) {
        request.log.warn(
          { event: "pre_diagnostic_already_exists", formId, userId },
          formId,
        );
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

      request.log.info({
        event: "prediagnoctic_creation_start",
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
          event: "prediagnoctic_created",
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
          event: "prediagnoctic_creation_failed",
          userId,
          formId,
          durationMs: Date.now() - startedAt,
          error: err,
        });

        return reply.code(500).send({ err: "Error to get the pre diagnostic" });
      }
    },
  );
};
