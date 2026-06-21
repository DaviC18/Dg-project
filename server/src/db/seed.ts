// biome-ignore assist/source/organizeImports: <drizzle-seed>
/** biome-ignore-all lint/style/noNestedTernary: <explanation> */
import { db, sql } from "./connections.js";
import { forms } from "./schema/forms.js";
import { preDiagnostics } from "./schema/preDiagnostics.js";
import { reset, seed } from "drizzle-seed";

type UrgencyLevel = "low" | "medium" | "urgent" | "life_threatening";

async function main() {
	// limpa as tabelas antes de seedar
	await reset(db, { forms, preDiagnostics });

	// seed da tabela forms
	await seed(db, { forms }).refine((f) => ({
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
				hadBefore: f.boolean(),
				hadBeforeWhen: f.string(),
				seenByProfessional: f.boolean(),
				seenByWho: f.string(),
				consent: f.boolean(),
			},
		},
	}));

	const formsTable = await db.select().from(forms);

	if (!formsTable.length) {
		throw new Error("Nenhum form foi criado.");
	}

	// seed da tabela preDiagnostics
	await db.insert(preDiagnostics).values(
	    formsTable.map((f) => {
	        const urgencyLevel: UrgencyLevel =
	            f.painLevel >= 9
	                ? "life_threatening"
	                : f.painLevel >= 7
	                    ? "urgent"
	                    : f.painLevel >= 4
	                        ? "medium"
	                        : "low";

	        return {
	            formId: f.id,
	            userId: f.userId,
	            title: "Pré-diagnóstico automático",
	            urgencyLevel,
	            model: "gemini-3-flash-preview",
	            result: {
	                summary: `Paciente relata sintomas gerais: ${f.symptomsDescription}`,
	                alerts:
	                    f.painLevel >= 7
	                        ? ["Dor intensa relatada"]
	                        : ["Sem alertas críticos aparentes"],
	                suggestionsToTheDoctor: [
	                    "Avaliar histórico clínico completo",
	                ],
	                examsSuggested: [],
	                observations: [],
	            },
	            analysisStatus: "pending" as const,
	        };
	    })
	);

	await sql.end();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});