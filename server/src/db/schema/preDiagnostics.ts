import {
  foreignKey,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { forms } from "./forms";

export const preDiagnostics = pgTable(
  "pre_diagnostics",
  {
    id: uuid().primaryKey().defaultRandom(),
    formId: uuid("form_id").notNull(),
    userId: text("user_id").notNull(),
    title: text().notNull(),
    result: jsonb("result").notNull(),
    model: text("model").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    formIdFk: foreignKey({
      columns: [table.formId],
      foreignColumns: [forms.id],
      name: "pre_diagnostic_form_id_forms_id_fk",
    }).onDelete("cascade"),

    formIdIdx: index("pre_diagnostics_form_id_idx").on(table.formId),
  }),
);
