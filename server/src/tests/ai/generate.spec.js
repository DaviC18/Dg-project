/** biome-ignore-all assist/source/organizeImports: <> */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Mocks compartilhados entre os testes.
// vi.hoisted garante que esses mocks existam antes dos imports do módulo testado.
const mocks = vi.hoisted(() => {
    return {
        // Logger fake para impedir saída real no console e permitir asserts.
        loggerInfo: vi.fn(),
        loggerError: vi.fn(),
        // Métodos fake do SDK Gemini.
        generateContent: vi.fn(),
        embedContent: vi.fn(),
    };
});
// Evita carregar o logger real do projeto.
vi.mock("pino", () => ({
    default: vi.fn(() => ({
        // O serviço chama logger.info(...)
        info: mocks.loggerInfo,
        // O serviço chama logger.error(...)
        error: mocks.loggerError,
    })),
}));
// Evita depender do .env real durante os testes.
vi.mock("../../env", () => ({
    env: {
        GEMINI_API_KEY: "test-api-key",
    },
}));
// Evita carregar configuração real de logger do projeto.
vi.mock("../../lib/logger", () => ({
    loggerConfig: {
        level: "silent",
    },
}));
// Substitui o SDK real da Google por uma versão fake controlada pelos testes.
vi.mock("@google/genai", () => {
    const GoogleGenAI = vi.fn(class MockGoogleGenAI {
        // O serviço acessa gemini.models.generateContent e gemini.models.embedContent.
        models = {
            generateContent: mocks.generateContent,
            embedContent: mocks.embedContent,
        };
    });
    return {
        GoogleGenAI,
    };
});
// Importa o módulo depois dos mocks, para o Vitest aplicar os substitutos.
import { PreDiagnostic, generateEmbeddings } from "../../services/gemini";
describe("gemini service", () => {
    beforeEach(() => {
        // Limpa chamadas anteriores para não vazar estado entre testes.
        vi.clearAllMocks();
    });
    afterEach(() => {
        // Garantia extra caso algum teste altere implementação.
        vi.restoreAllMocks();
    });
    it("should generate a pre-diagnostic successfully", async () => {
        // Resposta fake da IA, compatível com o schema esperado pelo serviço.
        mocks.generateContent.mockResolvedValueOnce({
            text: JSON.stringify({
                title: "Dor de cabeça",
                summary: "Possível cefaleia primária.",
                alerts: [],
                suggestionsToTheDoctor: ["Avaliar padrão da dor"],
                examsSuggested: ["Exame neurológico"],
                observations: ["Sem sinais de alarme informados."],
            }),
        });
        const result = await PreDiagnostic({
            symptomsDescription: "Dor de cabeça",
            startDate: "2026-06-01",
            symptomsStatus: "worse",
            painLevel: 7,
            hadBefore: true,
            hadBeforeWhen: "2025-12-01",
            seenByProfessional: false,
            seenByWho: null,
            consent: true,
        });
        // Verifica se o SDK foi chamado com o modelo correto.
        expect(mocks.generateContent).toHaveBeenCalledTimes(1);
        // Verifica se o prompt montado contém a transformação yes/no usada no código.
        const callArg = mocks.generateContent.mock.calls[0][0];
        expect(callArg.model).toBe("gemini-3-flash-preview");
        expect(callArg.contents).toContain('"hadBefore": "yes"');
        expect(callArg.contents).toContain('"seenByProfessional": "no"');
        expect(callArg.config.responseMimeType).toBe("application/json");
        // Verifica se o logger registrou sucesso.
        expect(mocks.loggerInfo).toHaveBeenCalledWith(expect.objectContaining({
            event: "ai_generation",
            model: "gemini-3-flash-preview",
            status: "success",
        }));
        // Verifica o retorno final já parseado pelo schema.
        expect(result).toEqual({
            title: "Dor de cabeça",
            summary: "Possível cefaleia primária.",
            alerts: [],
            suggestionsToTheDoctor: ["Avaliar padrão da dor"],
            examsSuggested: ["Exame neurológico"],
            observations: ["Sem sinais de alarme informados."],
        });
    });
    it("should throw when Gemini returns empty text", async () => {
        // Simula resposta vazia da API.
        mocks.generateContent.mockResolvedValueOnce({
            text: "",
        });
        await expect(PreDiagnostic({
            symptomsDescription: "Dor de cabeça",
            startDate: "2026-06-01",
            symptomsStatus: "worse",
            painLevel: 7,
            hadBefore: true,
            hadBeforeWhen: "2025-12-01",
            seenByProfessional: false,
            seenByWho: null,
            consent: true,
        })).rejects.toThrow("Gemini returned empty response");
        // Mesmo quando a resposta vem vazia, o serviço registra a tentativa.
        expect(mocks.loggerInfo).toHaveBeenCalledWith(expect.objectContaining({
            event: "ai_generation",
            status: "success",
        }));
    });
    it("should throw when Gemini API fails", async () => {
        // Simula falha do SDK antes mesmo de chegar na resposta.
        mocks.generateContent.mockRejectedValueOnce(new Error("Gemini down"));
        await expect(PreDiagnostic({
            symptomsDescription: "Dor de cabeça",
            startDate: "2026-06-01",
            symptomsStatus: "worse",
            painLevel: 7,
            hadBefore: true,
            hadBeforeWhen: "2025-12-01",
            seenByProfessional: false,
            seenByWho: null,
            consent: true,
        })).rejects.toThrow("Gemini down");
        // Erro precisa ser logado.
        expect(mocks.loggerError).toHaveBeenCalledWith(expect.objectContaining({
            event: "ai_generation",
            model: "gemini-3-flash-preview",
            status: "failed",
        }));
    });
    it("should generate embeddings successfully", async () => {
        // Resposta fake do endpoint de embeddings.
        mocks.embedContent.mockResolvedValueOnce({
            embeddings: [
                {
                    values: [0.1, 0.2, 0.3],
                },
            ],
        });
        const result = await generateEmbeddings("Dor de cabeça e febre");
        expect(mocks.embedContent).toHaveBeenCalledTimes(1);
        expect(mocks.embedContent).toHaveBeenCalledWith({
            model: "gemini-embedding-2",
            contents: [{ text: "Dor de cabeça e febre" }],
            config: {
                taskType: "RETRIEVAL_DOCUMENT",
            },
        });
        expect(mocks.loggerInfo).toHaveBeenCalledWith(expect.objectContaining({
            event: "embedding_generation",
            model: "gemini-embedding-2",
            status: "success",
        }));
        expect(result).toEqual([0.1, 0.2, 0.3]);
    });
    it("should throw when embeddings are missing", async () => {
        // Simula resposta sem vetor de embeddings.
        mocks.embedContent.mockResolvedValueOnce({});
        await expect(generateEmbeddings("Dor de cabeça e febre")).rejects.toThrow("It was not possible to generate the embeddings.");
        expect(mocks.loggerError).toHaveBeenCalledWith(expect.objectContaining({
            event: "embedding_generation",
            model: "gemini-embedding-2",
            status: "failed",
        }));
    });
    it("should throw when embedding API fails", async () => {
        // Simula erro bruto do SDK.
        mocks.embedContent.mockRejectedValueOnce(new Error("Embedding down"));
        await expect(generateEmbeddings("Dor de cabeça e febre")).rejects.toThrow("Embedding down");
        expect(mocks.loggerError).toHaveBeenCalledWith(expect.objectContaining({
            event: "embedding_generation",
            model: "gemini-embedding-2",
            status: "failed",
        }));
    });
});
