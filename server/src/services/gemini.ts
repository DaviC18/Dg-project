// biome-ignore assist/source/organizeImports: <>
import { GoogleGenAI } from "@google/genai";
import { env } from "../env";
import { z } from "zod";

const gemini = new GoogleGenAI({
	apiKey: env.GEMINI_API_KEY,
});

const model = "gemini-3-flash-preview";


const preDiagnosticSchema = z.object({
	resumo: z.string().describe("Resumo objetivo do formulário preenchido."),
	alertas: z
		.array(z.string())
		.describe("Sinais de alerta identificados no caso."),
	sugestoesAoMedico: z
		.array(z.string())
		.describe("Sugestões clínicas para o médico avaliar."),
	examesSugeridos: z
		.array(z.string())
		.describe("Exames que podem ser considerados."),
	observacoes: z
		.array(z.string())
		.describe("Observações importantes e limitações do pré-diagnóstico."),
});

type PreDiagnosticResult = z.infer<typeof preDiagnosticSchema>;

export const PreDiagnostic = async (formData: {
	symptomsDescription: string;
	startDate: string;
	symptomsStatus: string;
	painLevel: number;
	hadBefore: string;
	hadBeforeWhen?: string | null;
	seenByProfessional: string;
	seenByWho?: string | null;
	consent: boolean;
}): Promise<PreDiagnosticResult> => {
	const prompt = `
Você é um assistente clínico. Analise o formulário abaixo e gere um PRÉ-DIAGNÓSTICO para um médico.

Regras:
- Não faça diagnóstico definitivo.
- Seja objetivo e técnico.
- Retorne APENAS JSON válido.
- Inclua resumo, alertas, sugestões ao médico, exames sugeridos e observações.
- Se faltar informação, diga isso nas observações.

Dados do formulário:
${JSON.stringify(formData, null, 2)}
`;

	const response = await gemini.models.generateContent({
		model,
		contents: prompt,
		config: {
			responseMimeType: "application/json",
			responseJsonSchema: z.toJSONSchema(preDiagnosticSchema),
		},
	});

	if (!response.text) {
		throw new Error("Não foi possível criar o pré-diagnóstico");
	}

	return preDiagnosticSchema.parse(JSON.parse(response.text));
};

export const generateEmbeddings = async (text: string) => {
	const response = await gemini.models.embedContent({
		model: "gemini-embedding-2",
		contents: [{ text }],
		config: {
			taskType: "RETRIEVAL_DOCUMENT",
		},
	});

	const values = response.embeddings?.[0].values;

	if (!values) {
		throw new Error("Não foi possível gerar os embeddings");
	}

	return values;
};
