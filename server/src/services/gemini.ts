// biome-ignore assist/source/organizeImports: <>
import { GoogleGenAI } from "@google/genai";
import { env } from "../env";
import { z } from "zod";
import { loggerConfig } from "../lib/logger";
import pino from "pino";

const logger = pino(loggerConfig);

const gemini = new GoogleGenAI({
	apiKey: env.GEMINI_API_KEY,
});

const model = "gemini-3-flash-preview";

const preDiagnosticSchema = z.object({
	title: z
		.string()
		.min(1)
		.max(80)
		.describe("Short neutral title for the case."),
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
	hadBefore: boolean;
	hadBeforeWhen?: string | null;
	seenByProfessional: boolean;
	seenByWho?: string | null;
	consent: boolean;
}): Promise<PreDiagnosticResult> => {
	const startedAt = Date.now();
	const prompt = `
You are a clinical assistant. Analyze the form below and generate a PRE-DIAGNOSIS for a physician.

Rules:

- Create a short, neutral, clinical title based on the patient's main complaint.

- Use at most 8 words.

- Do not use diagnosis names.

- Do not make a definitive diagnosis.

- Be objective and technical.

- Return ONLY valid JSON.

- Include a summary, alerts, suggestions for the physician, suggested tests, and observations.

- If information is missing, state this in the observations.

Form data:
${JSON.stringify(
	{
		...formData,
		hadBefore: formData.hadBefore ? "yes" : "no",
		seenByProfessional: formData.seenByProfessional ? "yes" : "no",
	},
	null,
	2
)}
`;

	try {
		const response = await gemini.models.generateContent({
			model,
			contents: prompt,
			config: {
				responseMimeType: "application/json",
				responseJsonSchema: z.toJSONSchema(preDiagnosticSchema),
			},
		});

		logger.info({
			event: "ai_generation",
			model,
			durationMs: Date.now() - startedAt,
			status: "success",
		});

		if (!response.text) {
			throw new Error("Gemini returned empty response");
		}

		return preDiagnosticSchema.parse(JSON.parse(response.text));
	} catch (err) {
		logger.error({
			event: "ai_generation",
			model,
			durationMs: Date.now() - startedAt,
			status: "failed",
			error: err,
		});

		throw err;
	}
};

export const generateEmbeddings = async (text: string) => {
	const startedAt = Date.now();
	try {
		const response = await gemini.models.embedContent({
			model: "gemini-embedding-2",
			contents: [{ text }],
			config: {
				taskType: "RETRIEVAL_DOCUMENT",
			},
		});

		logger.info({
			event: "embedding_generation",
			model: "gemini-embedding-2",
			durationMs: Date.now() - startedAt,
			status: "success",
		});

		const values = response.embeddings?.[0].values;

		if (!values) {
			throw new Error("It was not possible to generate the embeddings.");
		}

		return values;
	} catch (err) {
		logger.error({
			event: "embedding_generation",
			model: "gemini-embedding-2",
			durationMs: Date.now() - startedAt,
			status: "failed",
			error: err,
		});

		throw err;
	}
};
