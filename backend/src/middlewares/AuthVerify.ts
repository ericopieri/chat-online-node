import { FastifyRequest, FastifyReply } from "fastify"

export const AuthMiddleware = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		await request.jwtVerify()
	} catch (err) {
		reply.code(401).send({
			success: false,
			err,
		})
	}
}
