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
	secretKey: env.CLERK_SECRET_KEY,
});
app.register(createForm);
app.register(createPreDiagnostic);
app.register(getForm);
app.register(getPreDiagnostic);
app.register(getIdPreDiagnostic)

app.listen({ port: env.PORT || 3333 }, (err) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
});
