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
  title: z.string().min(1).max(80),
  summary: z.string(),
  alerts: z.array(z.string()),
  suggestionsToTheDoctor: z.array(z.string()),
  examsSuggested: z.array(z.string()),
  observations: z.array(z.string()),
  urgencyLevel: z.enum(["low", "medium", "urgent", "life_threatening"]),
  safetyNotice: z.string(),
  nextStep: z.string(),
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
- Never present this as a definitive diagnosis.
- Keep the title neutral, objective, and non-diagnostic.

- Include a field called "urgencyLevel" with ONLY one of the following values:
  - "mild": Mild symptoms, no warning signs, routine medical follow-up recommended.
  - "moderate": Symptoms require medical evaluation but do not suggest immediate danger.
  - "urgent": Symptoms may indicate a serious condition and the patient should seek medical attention as soon as possible.
  - "life_threatening": Strong signs of a potentially life-threatening condition requiring immediate emergency care.

- Determine the urgencyLevel exclusively from the symptoms and warning signs provided by the patient.

- Include a field called "safetyNotice".
- If urgencyLevel is:
  - "mild": safetyNotice may be null.
  - "moderate": Provide brief guidance encouraging medical evaluation.
  - "urgent": Clearly advise the patient to seek prompt medical attention.
  - "life_threatening": Clearly instruct the patient to seek emergency medical care immediately or contact emergency services.

- Never exaggerate the urgency level.
- When information is insufficient, choose the safest reasonable assessment and mention the limitation in observations.

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
