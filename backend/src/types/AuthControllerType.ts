import { FastifyReply, FastifyRequest } from "fastify"

export interface IAuthController {
	signIn: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
	signUp: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
}
