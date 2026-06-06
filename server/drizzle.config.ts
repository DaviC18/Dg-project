/** biome-ignore-all assist/source/organizeImports: <> */
import { env } from './src/env';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema/**/*.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});