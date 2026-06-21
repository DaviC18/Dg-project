/** biome-ignore-all lint/suspicious/useAwait: <> */
import { getAuth } from "@clerk/fastify";
import { db } from "../../../db/connections";
export const getIdPreDiagnostic = (app) => {
    app.get("/pre-diagnostics/:id", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            request.log.warn({
                event: "unauthorized_prediagnostic_access"
            });
            return reply.code(401).send({ error: "Not Auth" });
        }
        request.log.info({
            event: "prediagnoscitc_accessing",
            userId
        });
        const { id } = request.params;
        const preDiagnostic = await db.query.preDiagnostics.findFirst({
            where: (p, { eq, and }) => and(eq(p.id, id), eq(p.userId, userId)),
            with: { form: true },
        });
        if (!preDiagnostic) {
            return reply.code(404).send({ error: "Pre-diagnostic not found" });
        }
        return reply.send(preDiagnostic);
    });
};
