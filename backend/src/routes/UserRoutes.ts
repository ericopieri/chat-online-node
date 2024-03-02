import { FastifyInstance } from "fastify"

async function routes(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		return { hello: "world" }
	})
}

export default routes
