/** biome-ignore-all lint/style/useFilenamingConvention: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import Fastify from "fastify";
import { getPreDiagnostic } from "../../http/routes/preDiagnostics/get-preDiagnostic";
import { db } from "../../db/connections";
vi.mock("@clerk/fastify", () => ({
    getAuth: () => ({
        userId: "test-user-id"
    })
}));
vi.mock("../../db/connections", () => ({
    db: {
        query: {
            preDiagnostics: {
                findMany: vi.fn()
            }
        }
    }
}));
describe("Get PreDiagnostics", () => {
    let app;
    beforeAll(async () => {
        app = Fastify();
        app.register(getPreDiagnostic);
        await app.ready();
    });
    afterAll(async () => {
        await app.close();
    });
    it("should get pre diagnostics successfully", async () => {
        const mockPreDiagnostics = [
            { id: "pre-diagnostic-id", userId: "test-user-id", form: { id: "form-id", } }
        ];
        vi.mocked(db.query.preDiagnostics.findMany).mockResolvedValueOnce(mockPreDiagnostics);
        const response = await app.inject({
            method: "GET",
            url: "/pre-diagnostics",
        });
        expect(response.statusCode).toBe(200);
        const body = response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(1);
        expect(body[0].userId).toBe("test-user-id");
    });
    it("should return 500 when database fails", async () => {
        vi.mocked(db.query.preDiagnostics.findMany).mockRejectedValueOnce(new Error("Database error"));
        const response = await app.inject({
            method: "GET",
            url: "/pre-diagnostics",
        });
        expect(response.statusCode).toBe(500);
        expect(response.json()).toEqual({ err: "Error to get the pre diagnostic" });
    });
});
