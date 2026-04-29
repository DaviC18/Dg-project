// biome-ignore assist/source/organizeImports: <>
import { db, sql } from "./connections.js";
import { form } from "./schema/form";
import { reset, seed } from "drizzle-seed";
import { preDiagnostic } from "./schema/preDiagnostic.js";

async function main() {
	// limpa apenas as duas tabelas que vamos seedar
	await reset(db, { form, preDiagnostic });

	await seed(db, { form, preDiagnostic }).refine((f) => ({
		form: {
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

	await sql.end();
}

main().catch((err) => {
	console.log(err);
	process.exit(1);
});
