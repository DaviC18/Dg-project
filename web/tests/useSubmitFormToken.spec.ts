import { act, renderHook } from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest"

// O hook lê NEXT_PUBLIC_API_URL no import time, então a env precisa existir antes.
vi.hoisted(() => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3333"
});

const getTokenMock = vi.fn();

vi.mock("@clerk/nextjs", () => ({
    useAuth: () => ({
        getToken: getTokenMock
    })
})) 

import { useSubmitFormToken } from "@/app/hooks/useSubmitFormToken";

function buildForm(): HTMLFormElement {
    // Cria um <form> real, porque o hook usa new FormData(e.currentTarget).
    const form = document.createElement("form")

    // Helper para criar inputs com name/value.
    const addInput = (name: string, value: string, type = "text") => {
        const input = document.createElement("input")
        input.name = name
        input.value = value
        input.type = type
        form.appendChild(input)
    }

    // Campos que o hook lê via FormData.get(...)
    addInput("symptomsDescription", "I have a headache.");
	addInput("startDate", "2026-06-01");
	addInput("symptomsStatus", "worse");
	addInput("painLevel", "7", "number");
	addInput("hadBefore", "yes");
	addInput("hadBeforeWhen", "2025-12-01");
	addInput("seenByProfessional", "no");
	addInput("seenByWho", "");

    // Checkbox precisa estar checked para FormData devolver "on".
    const consent = document.createElement("input")
    consent.type = "checkbox"
    consent.name = "consent"
    consent.checked = true
    form.appendChild(consent)

    return form
}

describe("useSubmitFormToken", () => {
    beforeEach(() => {
        // Limpa chamadas entre testes.
        vi.clearAllMocks();

        // Mock global do fetch
        vi.stubGlobal("fetch", vi.fn())
    }) 

    afterEach(() => {
        // Remove o fetch mockado depois de cada teste.
        vi.unstubAllGlobals();
    })

    it("should submit the form and then create the pre-diagnostic", async () => {
        // Primeiro request: /forms
        const formResponse = {
            form: {
                id: "form-id"
            }
        }

        // Segundo request: /pre-diagnostics
        const preDiagnosticResponse = {
            id: "prediagnostic-id",
			userId: "test-user-id",
			formId: "form-id",
        }

        getTokenMock.mockResolvedValueOnce("fake-clerk-token");


        // Primeira chamada do fetch: cria form.
        vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			status: 201,
			json: async () => formResponse,
		} as Response);

        // Segunda chamada do fetch: cria pré-diagnóstico.
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            status: 201,
            json: async () => preDiagnosticResponse,
        } as Response)

        const {result} = renderHook(() => useSubmitFormToken())

        const form = buildForm()
        const preventDefault = vi.fn()

        await act(async () => {
            await result.current.handleSubmit({
                preventDefault,
                currentTarget: form
            } as unknown as React.FormEvent<HTMLFormElement>)
        });

        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(getTokenMock).toHaveBeenCalledTimes(1);

        // Garante que o hook chamou os dois endpoints na ordem correta.
        expect(fetch).toHaveBeenNthCalledWith(
            1,
            "http://localhost:3333/forms",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    Authorization: "Bearer fake-clerk-token",
                    "Content-Type": "application/json",
                })
            })
        )

        expect(fetch).toHaveBeenNthCalledWith(
            2, 
            "http://localhost:3333/pre-diagnostics",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    Authorization: "Bearer fake-clerk-token",
					"Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    formId: "form-id"
                })
            })

        )
    })

    it("should stop when there is no token", async () => {
        getTokenMock.mockResolvedValueOnce(null)

        const { result } = renderHook(() => useSubmitFormToken())

        const form = buildForm()
        const preventDefault = vi.fn()

        await act(async () => {
            await result.current.handleSubmit({
                preventDefault,
                currentTarget: form
            } as unknown as React.FormEvent<HTMLFormElement>)
        })

        expect(preventDefault).toHaveBeenCalledTimes(1)
        expect(fetch).not.toHaveBeenCalled()
    })
})