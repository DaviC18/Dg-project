import type { FastifyJWT } from "@fastify/jwt";

declare module "fastify" {
	interface FastifyInstance {
		jwt: FastifyJWT;
	}
}
