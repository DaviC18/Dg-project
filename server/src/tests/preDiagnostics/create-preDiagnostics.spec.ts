/** biome-ignore-all assist/source/organizeImports: <> */

import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import Fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createPreDiagnostic } from "../../http/routes/preDiagnostics/create-preDiagnostic";

// UUID válido, porque a rota exige z.string().uuid()
const VALID_FORM_ID = "550e8400-e29b-41d4-a716-446655440000";

// Mocks hoisted: o Vitest registra esses mocks antes dos imports serem usados.
const mocks = vi.hoisted(() => ({
	// Clerk fake: controla a autenticação do request.
	getAuth: vi.fn(),

	// Banco fake: simula o select do formulário.
	findForm: vi.fn(),

	// Banco fake: simula a checagem de pre-diagnostic já existente.
	findExistingPreDiagnostic: vi.fn(),

	// Gemini fake: evita chamar IA real no teste.
	preDiagnosticAI: vi.fn(),

	// Encadeamento do insert do Drizzle.
	dbInsert: vi.fn(),
	dbInsertValues: vi.fn(),
	dbInsertReturning: vi.fn(),

	// Encadeamento do update do Drizzle.
	dbUpdate: vi.fn(),
	dbUpdateSet: vi.fn(),
	dbUpdateWhere: vi.fn(),
}));

vi.mock("@clerk/fastify", () => ({
	// Toda request vai parecer autenticada neste arquivo de teste.
	getAuth: mocks.getAuth,
}));

vi.mock("../../services/gemini", () => ({
	// Substitui a IA real por uma função controlada pelo teste.
	PreDiagnostic: mocks.preDiagnosticAI,
}));

vi.mock("../../db/connections", () => ({
	// Substitui o banco real por um objeto fake totalmente controlado.
	db: {
		query: {
			forms: {
				findFirst: mocks.findForm,
			},
			preDiagnostics: {
				findFirst: mocks.findExistingPreDiagnostic,
			},
		},
		insert: mocks.dbInsert,
		update: mocks.dbUpdate,
	},
}));

describe("Create PreDiagnostic", () => {
	let app: ReturnType<typeof Fastify>;

	beforeAll(async () => {
		// O app de teste precisa usar os mesmos compilers do app real,
		// senão o Fastify tenta interpretar schema Zod como schema JSON puro.
		app = Fastify().withTypeProvider<ZodTypeProvider>();
		app.setValidatorCompiler(validatorCompiler);
		app.setSerializerCompiler(serializerCompiler);

		app.register(createPreDiagnostic);

		await app.ready();
	});

	beforeEach(() => {
		// Limpa chamadas e implementações entre testes para evitar vazamento de estado.
		vi.clearAllMocks();

		// Simula autenticação válida.
		mocks.getAuth.mockReturnValue({
			userId: "test-user-id",
		});

		// Encadeamento do insert do Drizzle:
		// db.insert(...).values(...).returning()
		mocks.dbInsertValues.mockReturnValue({
			returning: mocks.dbInsertReturning,
		});
		mocks.dbInsert.mockReturnValue({
			values: mocks.dbInsertValues,
		});

		// Encadeamento do update do Drizzle:
		// db.update(...).set(...).where(...)
		mocks.dbUpdateSet.mockReturnValue({
			where: mocks.dbUpdateWhere,
		});
		mocks.dbUpdate.mockReturnValue({
			set: mocks.dbUpdateSet,
		});
	});

	afterAll(async () => {
		await app.close();
	});

	it("should create a pre-diagnostic successfully", async () => {
		// O form precisa existir e pertencer ao usuário autenticado.
		mocks.findForm.mockResolvedValueOnce({
			id: VALID_FORM_ID,
			userId: "test-user-id",
			symptomsDescription: "Dor de cabeça",
			startDate: "2026-06-01",
			symptomsStatus: "worse",
			painLevel: 7,
			hadBefore: false,
			hadBeforeWhen: null,
			seenByProfessional: false,
			seenByWho: null,
			consent: true,
			analysisStatus: "pending",
			createdAt: new Date(),
		});

		// Não pode existir pre-diagnostic anterior para o mesmo form.
		mocks.findExistingPreDiagnostic.mockResolvedValueOnce(null);

		// A IA devolve um objeto compatível com o schema da rota.
		mocks.preDiagnosticAI.mockResolvedValueOnce({
			title: "Dor de cabeça",
			summary: "Possível cefaleia primária.",
			alerts: [],
			suggestionsToTheDoctor: ["Avaliar padrão da dor"],
			examsSuggested: ["Exame neurológico"],
			observations: ["Sem sinais de alarme informados."],
		});

		// O insert devolve o registro salvo no banco.
		mocks.dbInsertReturning.mockResolvedValueOnce([
			{
				id: "prediagnostic-id",
				userId: "test-user-id",
				formId: VALID_FORM_ID,
				title: "Dor de cabeça",
				result: {
					title: "Dor de cabeça",
					summary: "Possível cefaleia primária.",
					alerts: [],
					suggestionsToTheDoctor: ["Avaliar padrão da dor"],
					examsSuggested: ["Exame neurológico"],
					observations: ["Sem sinais de alarme informados."],
				},
				model: "gemini-3-flash-preview",
				createdAt: new Date(),
			},
		]);

		const response = await app.inject({
			method: "POST",
			url: "/pre-diagnostics",
			payload: {
				// UUID válido, senão o Zod devolve 400 antes de entrar na rota.
				formId: VALID_FORM_ID,
			},
		});

		expect(response.statusCode).toBe(201);

		const body = response.json();
		expect(body).toMatchObject({
			id: "prediagnostic-id",
			userId: "test-user-id",
			formId: VALID_FORM_ID,
			title: "Dor de cabeça",
			model: "gemini-3-flash-preview",
		});
	});

	it("should return 404 when form does not exist", async () => {
		// Se o form não existe, a rota retorna 404 antes de chamar IA ou insert.
		mocks.findForm.mockResolvedValueOnce(null);

		const response = await app.inject({
			method: "POST",
			url: "/pre-diagnostics",
			payload: {
				formId: VALID_FORM_ID,
			},
		});

		expect(response.statusCode).toBe(404);
		expect(response.json()).toEqual({
			error: "Form not found",
		});
	});

	it("should return 409 when pre-diagnostic already exists", async () => {
		// O form existe...
		mocks.findForm.mockResolvedValueOnce({
			id: VALID_FORM_ID,
			userId: "test-user-id",
		});

		// ...mas já há um pre-diagnostic salvo para ele.
		mocks.findExistingPreDiagnostic.mockResolvedValueOnce({
			id: "existing-prediagnostic-id",
			formId: VALID_FORM_ID,
			userId: "test-user-id",
		});

		const response = await app.inject({
			method: "POST",
			url: "/pre-diagnostics",
			payload: {
				formId: VALID_FORM_ID,
			},
		});

		// A rota não retorna 400/401 aqui: o contrato real é 409 Conflict.
		expect(response.statusCode).toBe(409);
		expect(response.json()).toEqual({
			error: "Pre-diagnostic already exists",
		});
	});
});