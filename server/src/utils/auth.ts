/** biome-ignore-all lint/suspicious/noExplicitAny: <api> */
export function requireAuth() {
	return async (request: any, reply: any) => {
		try {
			await request.jwtVerify();
		} catch {
			return reply.status(401).send({ error: "Unauthorized" });
		}
	};
}

export function requireRole(wantedRole: "pacient" | "doctor") {
	return async (request: any, reply: any) => {
		try {
			await request.jwtVerify(); // decodifica e popula request.user
		} catch {
			return reply.status(401).send({ error: "Unauthorized" });
		}
		const user = (request as any).user;
		if (!user || user.role !== wantedRole) {
			return reply.status(403).send({ error: "Forbidden" });
		}
	};
}
