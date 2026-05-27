import { env } from "../env";

export const loggerConfig = {
	level: "info",

	transport:
		env.NODE_ENV === "production"
			? undefined
			: {
					target: "pino-pretty",
					options: {
						colorize: true,
					},
				},

	redact: ["req.headers.authorization", "password", "token"],
};
