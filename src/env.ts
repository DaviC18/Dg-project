// src/env.ts
// biome-ignore assist/source/organizeImports: <dotenv>
import dotenv from "dotenv";
dotenv.config(); // <<-- carrega .env antes de qualquer parse

import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(5234),
	DATABASE_URL: z
		.string()
		.url() // valida URL
		.refine((v) => v.startsWith("postgresql://"), {
			message: "DATABASE_URL deve começar com postgresql://",
		}),
	JWT_SECRET_KEY: z.string(),
});

export const env = envSchema.parse({
	PORT: process.env.PORT,
	DATABASE_URL: process.env.DATABASE_URL,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});
