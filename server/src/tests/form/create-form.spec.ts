import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { createForm } from '../../http/routes/forms/create-form';

vi.mock("@cleck/fastify", () => ({
    getAuth: () => ({
        userId: "test-user-id"
    })
}))

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
            payload: {
        symptomsDescription: "Dor de cabeça",

        startDate: "2026-06-01",

        symptomsStatus: "worse",

        painLevel: 7,

        hadBefore: false,

        hadBeforeWhen: null,

        seenByProfessional: false,

        seenByWho: null,

        consent: true,
      },
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
            url: "/pre-diagnostics",
            payload: {
                formId: "some-form-id",
            }
        })
        expect(response.statusCode).toBe(400);
        expect(response.json()).toEqual({err: "Error to create the Form"})
    })
})