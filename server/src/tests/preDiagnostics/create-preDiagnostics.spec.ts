import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import Fastify from "fastify";
import { createPreDiagnostic } from "../../http/routes/preDiagnostics/create-preDiagnostic";

vi.mock("@clerk/fastify", () => ({
    getAuth: () => ({
        userId: "test-user-id"
    })
}))

describe("Create PreDiagnostic", () => {
    let app: ReturnType<typeof Fastify>;

    beforeAll(async () => {
        app = Fastify();
        app.register(createPreDiagnostic)
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should create a pre-diagnostic successfully", async () => {
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

    it("should return 400 if consent is not given", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/pre-diagnostics",
            payload: {
                formId: "some-form-id",
            }
        })
        expect(response.statusCode).toBe(400);
        expect(response.json()).toEqual({err: "Error to create the pre diagnostics"})
    })
})