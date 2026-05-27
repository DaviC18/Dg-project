import pino from "pino";
import { env } from "../env";

export const logger = pino({
	level: "info",
	transport:
		env.DATABASE_URL === "production" ? undefined : { target: "pino-pretty" },
	redact: ["req.headers.authorization", "password", "token"],
});
