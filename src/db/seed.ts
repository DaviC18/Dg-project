import { db, sql } from "./connections.js";
import { users } from "./schema/users";
import { reset, seed } from "drizzle-seed";

async function main() {
	// limpa apenas as duas tabelas que vamos seedar
	await reset(db, { users });

	await seed(db, { users }).refine((f) => ({
		users: {
			count: 5,
			columns: {
				name: f.companyName(),
				cpf: f.number(),
				age: f.string(),
				email: f.email(),
				password: f.string(),
				role: f.boolean(),
			},
		},
	}));

	await sql.end();
}

main().catch((err) => {
	console.log(err);
	process.exit(1);
});
