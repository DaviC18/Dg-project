import { getAuth } from "@clerk/fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

export const getUser: FastifyPluginCallbackZod = (app) => {
	app.get("/me", (request, reply) => {
		const auth = getAuth(request);

		if (!auth.userId) {
			return reply.code(401).send({ error: "Not authenticated" });
		}

		return reply.send({ userId: auth.userId });
	});
};
