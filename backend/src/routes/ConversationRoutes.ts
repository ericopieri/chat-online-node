import { FastifyInstance } from "fastify"
import { ConversationService } from "../services/ConversationService"
import { ConversationController } from "../controllers/ConversationController"

import { AuthMiddleware } from "../middlewares/AuthVerify"
import { validateBody } from "../middlewares/validateBody"
import { PostMessageBodySchema } from "../types/PostMessageBodyType"

export async function ConversationRoutes(app: FastifyInstance): Promise<void> {
	const conversationController: ConversationController =
		new ConversationController(new ConversationService())

	app.get(
		"/lastConversations/",
		{ preHandler: AuthMiddleware },
		conversationController.getUserConversations.bind(
			conversationController,
		),
	)

	app.get(
		"/conversations/:receiver",
		{ preHandler: AuthMiddleware },
		conversationController.getSpecificConversation.bind(
			conversationController,
		),
	)

	app.post(
		"/sendMessage/:receiver",
		{ preHandler: [AuthMiddleware, validateBody(PostMessageBodySchema)] },
		conversationController.postMessageIntoConversation.bind(
			conversationController,
		),
	)
}
