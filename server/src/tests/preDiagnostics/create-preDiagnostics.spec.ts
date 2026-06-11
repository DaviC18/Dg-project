/** biome-ignore-all assist/source/organizeImports: <> */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import Fastify from "fastify";
import { createPreDiagnostic } from "../../http/routes/preDiagnostics/create-preDiagnostic";
import { db } from "../../db/connections";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";

vi.mock("@clerk/fastify", () => ({
    getAuth: () => ({
        userId: "test-user-id"
    })
}))

describe("Create PreDiagnostic", () => {
    let app: ReturnType<typeof Fastify>;

    beforeAll(async () => {
        app = Fastify().withTypeProvider<ZodTypeProvider>();
        app.setValidatorCompiler(validatorCompiler);
        app.setSerializerCompiler(serializerCompiler);
        app.register(createPreDiagnostic)
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should create a pre-diagnostic successfully", async () => {
        const mockPreDiagnostic = [{id: "pre-diagnostic-id", userId: "test-user-id", formId: "some-form-id"}];
        vi.mocked(db.query.preDiagnostics.findFirst).mockResolvedValueOnce(mockPreDiagnostic as any);
        const response = await app.inject({
            method: "POST",
            url: "/pre-diagnostics",
            payload: {
                formId: "some-form-id",
            }
        })
        expect(response.statusCode).toBe(201);
        const body = JSON.parse(response.body);
        expect(body).toBeDefined();
        expect(body.userId).toBe("test-user-id");
        expect(body.formId).toBe("some-form-id");
    })

    it("should return 400 if pre-diagnostic already exists", async () => {
        vi.mocked(db.query.preDiagnostics.findFirst).mockRejectedValueOnce(new Error("Database error") as any);
        const response = await app.inject({
            method: "POST",
            url: "/pre-diagnostics",
            payload: {
                formId: "some-form-id",
            }
        })
        expect(response.statusCode).toBe(401);
        expect(response.json()).toEqual({err: "Error to create the pre diagnostics"})
    })
})