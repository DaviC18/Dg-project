// biome-ignore assist/source/organizeImports: <>
import { GoogleGenAI } from "@google/genai";
import { env } from "../env";
import { loggerConfig } from "../lib/logger";
import { z } from "zod";
import pino from "pino";
const logger = pino(loggerConfig);
const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
});
const model = "gemini-3-flash-preview";
const URGENCY_LEVELS = [
    "low",
    "medium",
    "urgent",
    "life_threatening",
];
const preDiagnosticSchema = z.object({
    title: z.string().min(1).max(80),
    summary: z.string().min(1),
    alerts: z.array(z.string()),
    suggestionsToTheDoctor: z.array(z.string()),
    examsSuggested: z.array(z.string()),
    observations: z.array(z.string()),
    urgencyLevel: z.enum(URGENCY_LEVELS),
    safetyNotice: z.string().nullable(),
    nextStep: z.string().min(1),
});
export const PreDiagnostic = async (formData) => {
    const startedAt = Date.now();
    const normalizedFormData = {
        ...formData,
        hadBefore: formData.hadBefore ? "yes" : "no",
        seenByProfessional: formData.seenByProfessional ? "yes" : "no",
    };
    const prompt = `
You are a clinical assistant. Analyze the form below and generate a PRE-DIAGNOSIS for a physician.

Rules:
- Never present this as a definitive diagnosis.
- Keep the title neutral, objective, and non-diagnostic.
- Use at most 8 words for the title.
- Do not use diagnosis names in the title.
- Return ONLY valid JSON.
- Include exactly these fields:
  - title
  - summary
  - alerts
  - suggestionsToTheDoctor
  - examsSuggested
  - observations
  - urgencyLevel
  - safetyNotice
  - nextStep
- urgencyLevel must be exactly one of:
  - low
  - medium
  - urgent
  - life_threatening
- safetyNotice:
  - may be null for low
  - should be brief for medium
  - should clearly advise prompt care for urgent
  - should clearly advise emergency care for life_threatening
- If information is insufficient, choose the safest reasonable assessment and mention the limitation in observations.

Form data:
${JSON.stringify(normalizedFormData, null, 2)}
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
        if (!response.text) {
            throw new Error("Gemini returned empty response");
        }
        const parsed = preDiagnosticSchema.parse(JSON.parse(response.text));
        logger.info({
            event: "ai_generation",
            model,
            durationMs: Date.now() - startedAt,
            status: "success",
        });
        return parsed;
    }
    catch (err) {
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
export const generateEmbeddings = async (text) => {
    const startedAt = Date.now();
    try {
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
        logger.info({
            event: "embedding_generation",
            model: "gemini-embedding-2",
            durationMs: Date.now() - startedAt,
            status: "success",
        });
        return values;
    }
    catch (err) {
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
