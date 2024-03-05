import { FastifyReply, FastifyRequest } from "fastify"
import { ConversationService } from "../services/ConversationService"
import { IConversationController } from "../types/ConversationControllerType"

export class ConversationController implements IConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	async getUserConversations(request: FastifyRequest, reply: FastifyReply) {
		const { userId } = request.params as { userId: string }

		try {
			const conversations =
				await this.conversationService.getUserConversations(
					Number(userId),
				)

			return reply.send({ success: true, conversations })
		} catch (err) {
			console.log(err)
		}
	}
}
