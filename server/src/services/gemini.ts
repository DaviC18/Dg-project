// biome-ignore assist/source/organizeImports: <>
import { GoogleGenAI } from "@google/genai";
import { env } from "../env";
import { z } from "zod";

const gemini = new GoogleGenAI({
	apiKey: env.GEMINI_API_KEY,
});

const model = "gemini-3-flash-preview";

const preDiagnosticSchema = z.object({
	summary: z.string().describe("Objective summary of the completed form."),
	alerts: z.array(z.string()).describe("Warning signs identified in the case."),
	suggestionsToTheDoctor: z
		.array(z.string())
		.describe("Clinical suggestions for the physician to evaluate."),
	examsSuggested: z.array(z.string()).describe("Tests that may be considered."),
	observations: z
		.array(z.string())
		.describe("Important observations and limitations of pre-diagnosis."),
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
You are a clinical assistant. Analyze the form below and generate a PRE-DIAGNOSIS for a physician.

Rules:

- Do not make a definitive diagnosis.

- Be objective and technical.

- Return ONLY valid JSON.

- Include a summary, alerts, suggestions for the physician, suggested tests, and observations.

- If information is missing, state this in the observations.

Form data:
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
		throw new Error("It was not possible to generate the embeddings.");
	}

	return values;
};
