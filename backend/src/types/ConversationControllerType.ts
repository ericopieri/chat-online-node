import { FastifyReply, FastifyRequest } from "fastify"

export interface IConversationController {
	getUserConversations: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<void>
}
