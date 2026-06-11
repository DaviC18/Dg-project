/** biome-ignore-all assist/source/organizeImports: <> */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { createForm } from '../../http/routes/forms/create-form';

const formPayload = {
    symptomsDescription: "Dor de cabeça",

        startDate: "2026-06-01",

        symptomsStatus: "worse",

        painLevel: 7,

        hadBefore: false,

        hadBeforeWhen: null,

        seenByProfessional: false,

        seenByWho: null,

}

vi.mock("@clerk/fastify", () => ({
    getAuth: () => ({
        userId: "test-user-id"
    })
}))

vi.mock("../../db/connections", () => ({
    db: {
        insert: vi.fn(() => ({
            values: vi.fn(() => ({
                returning: vi.fn().mockResolvedValueOnce([
                    {id: "form-id", userId: "test-user-id", symptomsDescription: "Dor de cabeça"}
                ])
            }))
        }))
    }}
))

describe("Create Form", () => {
    let app: ReturnType<typeof Fastify>;


    beforeAll(async () => {
        app = Fastify();

        app.register(createForm)

        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should create a form successfully", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/forms",
            payload: {...formPayload, formId: "some-form-id", consent: true},
        })

        expect(response.statusCode).toBe(201);
        const body = JSON.parse(response.body);
        expect(body.form).toBeDefined();
        expect(body.form.userId).toBe("test-user-id");
        expect(body.form.symptomsDescription).toBe("Dor de cabeça");
    })
    
    it("should return 400 if consent is not given", async () => {
        const response = await app.inject({
            method: "POST", 
            url: "/forms",
            payload: {
                ...formPayload,
                formId: "some-form-id",
                consent: false,
            }
        })
        expect(response.statusCode).toBe(400);
        expect(response.json()).toEqual({err: "Error to create the Form"})
    })
})