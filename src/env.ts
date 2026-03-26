// src/env.ts
// biome-ignore assist/source/organizeImports: <dotenv>
import dotenv from "dotenv";
dotenv.config(); // <<-- carrega .env antes de qualquer parse

import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(5234),
	CLERK_PUBLISHABLE_KEY: z.string().min(1),
	CLERK_SECRET_KEY: z.string().min(1),
	DATABASE_URL: z
		.string()
		.min(1)
		.url() // valida URL
		.refine((v) => v.startsWith("postgresql://"), {
			message: "DATABASE_URL deve começar com postgresql://",
		}),
	JWT_SECRET_KEY: z.string().min(1),
});

export const env = envSchema.parse({
	PORT: process.env.PORT,
	CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
	DATABASE_URL: process.env.DATABASE_URL,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});
