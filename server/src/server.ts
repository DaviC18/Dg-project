/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/suspicious/useAwait: <> */
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { createForm } from "./http/routes/forms/create-form";
import { getForm } from "./http/routes/forms/get-form";
import { getPreDiagnostic } from "./http/routes/preDiagnostics/get-preDiagnostic";
import { clerkPlugin } from "@clerk/fastify";
import { createPreDiagnostic } from "./http/routes/preDiagnostics/create-preDiagnostic";
import { loggerConfig } from "./lib/logger";
import { getIdPreDiagnostic } from "./http/routes/preDiagnostics/get-id-preDiagnostic";


const app = fastify({
	logger: loggerConfig,
}).withTypeProvider<ZodTypeProvider>();

app.addHook("onResponse", async (request, reply) => {
	app.log.info({
		method: request.method,
		url: request.url,
		statusCode: reply.statusCode,
	});
});

app.register(fastifyCors, {
	origin: ["http://localhost:3000", "http://localhost:5173"],
	allowedHeaders: ["Content-Type", "Authorization"],
	methods: ["GET", "POST", "OPTIONS"],
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/", async (request) => {
	request.log.info("something");
	return "ok";
});

app.register(clerkPlugin, {
	publishableKey: env.CLERK_PUBLISHABLE_KEY,
	secretKey: env.CLERK_SECRET_KEY,
});
app.register(createForm);
app.register(createPreDiagnostic);
app.register(getForm);
app.register(getPreDiagnostic);
app.register(getIdPreDiagnostic)

const host = "0.0.0.0";
const port = Number(process.env.PORT) || 3333;

async function start() {
	try {
		console.log(`[BOOT] Starting server on ${host}:${port}`);
		console.log(`[BOOT] NODE_ENV=${process.env.NODE_ENV}`);
		console.log(`[BOOT] PORT=${process.env.PORT}`);

		const address = await app.listen({
			port,
			host,
		});

		app.log.info(`Server running at ${address}`);
		console.log(`[BOOT] Server running at ${address}`);
	} catch (err) {
		app.log.error(err);
		console.error("[BOOT] Failed to start server:", err);
		process.exit(1);
	}
}

start();