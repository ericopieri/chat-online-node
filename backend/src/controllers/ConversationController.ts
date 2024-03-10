import { FastifyReply, FastifyRequest } from "fastify"
import { ConversationService } from "../services/ConversationService"
import { IConversationController } from "../types/ConversationControllerType"
import { MessageService } from "../services/MessageService"

export class ConversationController implements IConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	async postMessageIntoConversation(
		request: FastifyRequest,
		reply: FastifyReply,
	) {
		const { username: sender } = request.user as { username: string }
		const { receiver } = request.params as { receiver: string }
		const { message } = request.body as { message: string }

		try {
			new MessageService().postMessage(message, { sender, receiver })

			return reply.code(201).send()
		} catch (err) {
			const { code, message } = err as {
				code: number
				message: string
			}

			return reply.code(code).send({
				success: false,
				message: message,
			})
		}
	}

	async getUserConversations(request: FastifyRequest, reply: FastifyReply) {
		const { username } = request.user as {
			username: string
		}

		try {
			const conversations =
				await this.conversationService.getUserConversations(username)

			return reply.send({ success: true, conversations })
		} catch (err) {
			const { code, message } = err as {
				code: number
				message: string
			}

			return reply.code(code).send({
				success: false,
				message: message,
			})
		}
	}

	async getSpecificConversation(
		request: FastifyRequest,
		reply: FastifyReply,
	) {
		const user = request.user as {
			username: string
		}

		const { receiver } = request.params as {
			receiver: string
		}

		try {
			const conversation = await this.conversationService.getConversation(
				user.username,
				receiver,
			)

			reply.send(conversation)
		} catch (err) {}
	}
}
