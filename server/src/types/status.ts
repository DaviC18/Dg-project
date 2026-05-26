import z from "zod";

const symptomsStatusValues = ["worse", "better", "same"] as const;

const symptomsStatusSchema = z.enum(symptomsStatusValues);

export const formSchema = z.object({
	symptomsDescription: z.string().min(1),

	startDate: z.string(),

	symptomsStatus: symptomsStatusSchema,

	painLevel: z.coerce.number().int().min(0).max(10),

	hadBefore: z.boolean(),

	hadBeforeWhen: z.string().nullable().optional(),

	seenByProfessional: z.boolean(),

	seenByWho: z.string().nullable().optional(),

	consent: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;
