import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

declare module "fastify" {
	interface FastifyInstance {
		checkRequiredFields(
			requiredFields: string[],
		): (request: FastifyRequest, reply: FastifyReply) => Promise<void>
	}
}
