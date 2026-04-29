import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const preDiagnostic = pgTable("preDiagnostic", {
	id: uuid().primaryKey().defaultRandom(),
	formId: uuid("form_id").notNull(),
	userId: text("user_id").notNull(),
	result: jsonb("result").notNull(),
	model: text("model").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
