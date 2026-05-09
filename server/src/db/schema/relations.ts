import { relations } from "drizzle-orm";
import { forms } from "./forms";
import { preDiagnostics } from "./preDiagnostics";

export const formsRelations = relations(forms, ({ many }) => ({
	preDiagnostics: many(preDiagnostics),
}));

export const preDiagnosticRelations = relations(preDiagnostics, ({ one }) => ({
	form: one(forms, {
		fields: [preDiagnostics.formId],
		references: [forms.id],
	}),
}));
