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
import { createPreDiagnostic } from "./http/routes/create-preDiagnostic";
import { getForm } from "./http/routes/get-form";
import { getPreDiagnostic } from "./http/routes/get-preDiagnostic";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "http://localhost:5173",
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/", () => {
	return "ok";
});

app.register(createForm);
app.register(createPreDiagnostic);
app.register(getForm);
app.register(getPreDiagnostic);

app.listen({ port: env.PORT || 3333 }, () => {
      console.log("Server is running");
});