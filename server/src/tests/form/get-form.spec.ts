import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import Fastify from "fastify";

import { getForm } from "../../http/routes/forms/get-form"
import { db } from "../../db/connections";

vi.mock("@clerk/fastify", () => ({
    getAuth: () => ({
        userId: "test-user-id"
    })
}))

vi.mock("../../db/connections", () => ({
    db: {
        query: {
            forms: {
                findMany: vi.fn()
            }
        }
    }
}))

describe("Get Form", () => {
    let app: ReturnType<typeof Fastify>;

    beforeAll(async () => {
        app = Fastify();

        app.register(getForm)

        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should get forms successfully", async () => {
        const mockForms = [
            {id: "form-id", userId: "test-user-id", symptomsDescription: "Dor de cabeça", preDiagnostics: []}
        ]
        const response = await app.inject({
            method: "GET",
            url: "/forms",
        })
        expect(response.statusCode).toBe(200);
        const body = response.json()
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(1);
        expect(body[0].userId).toBe("test-user-id");
    })

    it("should return 500 when database fails", async () => {
        vi.mocked(db.query.forms.findMany).mockRejectedValueOnce(new Error("Database error"));
        const response = await app.inject({
            method: "GET",
            url: "/forms",
        })
        expect(response.statusCode).toBe(500);
        expect(response.json()).toEqual({ err: "Error to get the form" });
    })

})