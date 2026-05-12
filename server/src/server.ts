import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { createForm } from "./http/routes/create-form";
import { getForm } from "./http/routes/get-form";
import { getPreDiagnostic } from "./http/routes/get-preDiagnostic";
import { clerkPlugin } from "@clerk/fastify";
import { getUser } from "./http/routes/getUser";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: ["http://localhost:3000", "http://localhost:5173"],
	allowedHeaders: ["Content-Type", "Authorization"],
	methods: ["GET", "POST", "OPTIONS"],
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/", () => "ok");

app.register(clerkPlugin, {
	secretKey: env.CLERK_SECRET_KEY,
});
app.register(createForm);
app.register(getForm);
app.register(getPreDiagnostic);
app.register(getUser);

app.listen({ port: env.PORT || 3333 }, () => {
	console.log("Server is running");
});
