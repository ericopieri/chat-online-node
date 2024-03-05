import prisma from "../prismaClient"
import { IConversationService } from "../types/ConversationServiceType"

export class ConversationService implements IConversationService {
	async getUserConversations(userId: number) {
		const userConversations = await prisma.conversation.findMany({
			where: {
				users: {
					some: {
						id: userId,
					},
				},
			},
			select: {
				id: true,
				users: {
					where: {
						NOT: {
							id: userId,
						},
					},
					select: {
						username: true,
					},
				},
				messages: {
					orderBy: {
						createdAt: "desc",
					},
					take: 1,
					select: {
						content: true,
						sender: {
							select: {
								username: true,
							},
						},
					},
				},
			},
		})

		const responseObject = userConversations.map((conversation) => {
			return {
				id: conversation.id,
				username: conversation.users[0].username,
				messages: conversation.messages,
			}
		})

		return responseObject
	}
}
