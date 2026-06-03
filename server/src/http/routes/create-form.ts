import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connections";
import { forms } from "../../db/schema/forms";
import { formSchema } from "../../types/status";

export const createForm: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/forms",
    {
      schema: {
        body: formSchema,
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      const startedAt = Date.now();

      if (!userId) {
        request.log.warn({ event: "unauthorized_form_creation" });
        return reply.code(401).send({ error: "Not authenticated" });
      }

      const data = formSchema.parse(request.body);

      if (!data.consent) {
        request.log.warn({ event: "form_without_consent", userId });

        return reply.code(400).send({
          error: "Consent is required to generate the preliminary diagnosis.",
        });
      }

      request.log.info({
        event: "form_creation_start",
        userId,
      });

      try {
        const [form] = await db
          .insert(forms)
          .values({
            ...data,
            userId,
          })
          .returning();
        request.log.info({
          event: "form_created",
          userId,
          formId: form.id,
          durationMs: Date.now() - startedAt,
        });

        return reply.code(201).send({
          form,
        });
      } catch (err) {
        request.log.error({
          event: "form_creation_failed",
          userId,
          durationMs: Date.now() - startedAt,
          error: err,
        });
        return reply.code(500).send({
          err: "Failed to create form and pre-diagnostic",
        });
      }
    },
  );
};
