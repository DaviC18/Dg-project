import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../../db/connections";
import { forms } from "../../db/schema/forms";
import { createPreDiagnosticRecord } from "./createPreDiagnosticRecord";

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
  model: z.string().min(1),
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

      if (!userId) {
        return reply.code(401).send({ error: "Not authenticated" });
      }

      const data = bodySchema.parse(request.body);

      if (!data.consent) {
        return reply.code(400).send({
          error: "Consent is required to generate the preliminary diagnosis.",
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

        const preDiagnostic = await createPreDiagnosticRecord({
          userId,
          formId: form.id,
          model: data.model,
          form,
        });

        return reply.code(201).send({
          form,
          preDiagnostic,
        });
      } catch (err) {
        console.error("ERROR TO CREATE FORM AND PRE-DIAGNOSTIC:", err);
        return reply.code(500).send({
          error: "Failed to create form and pre-diagnostic",
        });
      }
    },
  );
};
