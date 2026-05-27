// biome-ignore assist/source/organizeImports: <>
import { db, sql } from "./connections.js";
import { forms } from "./schema/forms.js";
import { reset, seed } from "drizzle-seed";
import { preDiagnostics } from "./schema/preDiagnostics.js";

async function main() {
	// limpa apenas as duas tabelas que vamos seedar
	await reset(db, { forms, preDiagnostics });

	await seed(db, { forms, preDiagnostics }).refine((f) => ({
		forms: {
			count: 9,
			columns: {
				userId: f.string(),
				symptomsDescription: f.string(),
				startDate: f.date({
					minDate: "2020-01-01",
					maxDate: "2026-12-31",
				}),
				symptomsStatus: f.string(),
				painLevel: f.int(),
				hadBefore: f.string(),
				hadBeforeWhen: f.string(),
				seenByProfessional: f.string(),
				seenByWho: f.string(),
				consent: f.boolean(),
			},
		},
	}));

	const formsTable = await db.select().from(forms);

	if (!formsTable.length) {
		throw new Error("Nenhum form foi criado.");
	}

	await db.insert(preDiagnostics).values(
		formsTable.map((f) => ({
			formId: f.id,
			userId: f.userId,
			model: "gemini-3-flash-preview ",
			result: {
				summary: `Patient reports general symptoms. ${f.symptomsDescription}`,
				alerts:
					f.painLevel > 7
						? ["Intense pain reported"]
						: ["No critical warnings apparent."],
				suggestionsToTheDoctor: [
					"Evaluate complete medical history.",
					"Correlate symptoms with physical examination.",
				],
				examsSuggested:
					f.painLevel > 5
						? ["Complete blood count (CBC), Imaging test"]
						: ["Clinical observation"],
				observations: [
					"Preliminary diagnosis generated automatically",
					"Does not replace medical evaluation",
				],
			},
		}))
	);

	await sql.end();
}

main().catch((err) => {
	console.log(err);
	process.exit(1);
});
