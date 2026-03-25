// biome-ignore assist/source/organizeImports: <drizzles>
import { text, uuid, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	age: text().notNull(),
	cpf: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	role: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
