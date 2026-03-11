import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { getPacientUser } from "./http/routes/get-pacient";
import { authRoutes } from "./http/routes/auth";
import { getDoctorUser } from "./http/routes/get-doctor";
import fastifyJwt from "@fastify/jwt";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "http://localhost:5173",
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET_KEY ?? "dev-secret",
	sign: { expiresIn: "1h" },
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);

app.setValidatorCompiler(validatorCompiler);

app.get("/", () => {
	return "ok";
});

app.register(authRoutes);
app.register(getPacientUser);
app.register(getDoctorUser);
app.register(authRoutes, { prefix: "/auth" });

app.listen({ port: env.PORT || 5432 });
