// biome-ignore assist/source/organizeImports: <drizzles>
import {
	uuid,
	timestamp,
	text,
	boolean,
	integer,
	date,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
	id: uuid().primaryKey().defaultRandom(),
	userId: text("user_id").notNull(),
	symptomsDescription: text("symptoms_description").notNull(),
	startDate: date("start_date").notNull(),
	symptomsStatus: text("symptoms_status").notNull(),
	painLevel: integer().notNull(),
	hadBefore: text("had_before").notNull(),
	hadBeforeWhen: text("had_before_when"),
	seenByProfessional: text("seen_by_professional").notNull(),
	seenByWho: text("seen_by_who"),
	consent: boolean("consent").notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
