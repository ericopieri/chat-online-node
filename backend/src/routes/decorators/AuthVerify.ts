import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

async function AuthMiddleware(app: FastifyInstance): Promise<void> {
	app.decorate(
		"authenticate",
		async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				await request.jwtVerify()
			} catch (err) {
				reply.send(err)
			}
		},
	)
}

export default AuthMiddleware
