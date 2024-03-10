import { IMessageService } from "../types/MessageServiceType"
import { ConversationService } from "./ConversationService"
import prisma from "../prismaClient"
import { ApiServiceException } from "../errors/ApiServiceException"
import { UserService } from "./UserService"

export class MessageService implements IMessageService {
	async postMessage(
		message: string,
		users: { sender: string; receiver: string },
	): Promise<void> {
		const { sender } = users

		const conversationId =
			await ConversationService.getConversationID(users)

		if (conversationId === undefined)
			throw new ApiServiceException(
				"Conversation between the two users does not exist",
				404,
			)

		const senderId = await UserService.getUserIDbyUsername(sender)

		if (senderId === undefined)
			throw new ApiServiceException("User not found", 404)

		try {
			await prisma.message.create({
				data: {
					content: message,
					senderId: senderId as number,
					conversationId: conversationId as number,
				},
			})
		} catch (err) {
			throw new ApiServiceException("Failed to create message", 500)
		}
	}
}
