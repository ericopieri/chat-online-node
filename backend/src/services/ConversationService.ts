import prisma from "../prismaClient"
import { IConversationService } from "../types/ConversationServiceType"

import { ApiServiceException } from "../errors/ApiServiceException"

export class ConversationService implements IConversationService {
	static async getConversationID({
		sender,
		receiver,
	}: {
		sender: string
		receiver: string
	}) {
		const conversation = await prisma.conversation.findFirst({
			where: {
				AND: [
					{
						users: {
							some: {
								username: sender,
							},
						},
					},
					{
						users: {
							some: {
								username: receiver,
							},
						},
					},
				],
			},
		})

		return conversation?.id
	}

	async getUserConversations(username: string) {
		try {
			const userConversations = await prisma.conversation.findMany({
				where: {
					users: {
						some: {
							username,
						},
					},
				},
				select: {
					id: true,
					users: {
						where: {
							NOT: {
								username,
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
		} catch (err) {
			throw new ApiServiceException(
				"Failed to get last conversations",
				500,
			)
		}
	}

	async getConversation(sender: string, receiver: string) {
		const users = await prisma.user.findMany({
			where: {
				OR: [{ username: sender }, { username: receiver }],
			},
			select: {
				username: true,
				id: true,
			},
		})

		if (users.length !== 2) {
			throw new ApiServiceException(
				"Failed to get conversation messages. Users not found",
				500,
			)
		}

		try {
			const conversation = await prisma.conversation.findFirst({
				where: {
					AND: [
						{ users: { some: { id: users[0].id } } },
						{ users: { some: { id: users[1].id } } },
					],
				},
				include: {
					messages: {
						orderBy: {
							createdAt: "desc",
						},
						select: {
							createdAt: true,
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

			if (conversation === null) {
				throw new ApiServiceException("Conversation not found", 404)
			}

			return conversation
		} catch (err) {
			throw new ApiServiceException(
				"Failed to get conversation messages",
				500,
			)
		}
	}
}
