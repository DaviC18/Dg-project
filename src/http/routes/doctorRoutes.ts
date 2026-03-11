// src/routes/doctor.ts
/** biome-ignore-all lint/suspicious/useAwait: <doctor only> */
import type { FastifyPluginAsync } from "fastify";
import { requireRole } from "../../utils/auth";

const doctorRoutes: FastifyPluginAsync = async (app) => {
	// opção A: rota com caminho completo
	app.get(
		"/only",
		{ preHandler: requireRole("doctor") },
		async (request, reply) => {
			// só médicos chegam aqui
			return { msg: "somente médicos" };
		}
	);

	// você pode adicionar outras rotas aqui (ex: app.get("/patients", ...))
};

export default doctorRoutes;
