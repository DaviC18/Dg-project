import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { clerkPlugin, clerkClient, getAuth } from "@clerk/fastify";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(clerkPlugin, {
	secretKey: env.CLERK_SECRET_KEY,
});

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

app.get("/protected", async (request, reply) => {
	const { isAuthenticated, userId } = getAuth(request);

	// biome-ignore lint/complexity/useSimplifiedLogicExpression: <>
	if (!isAuthenticated || !userId) {
		return reply.code(401).send({ error: "Not authenticated" });
	}

	const user = await clerkClient.users.getUser(userId);
	return reply.send({ user });
});

app.listen({ port: env.PORT || 5432 });
