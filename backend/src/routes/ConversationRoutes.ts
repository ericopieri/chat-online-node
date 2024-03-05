import { FastifyInstance } from "fastify"
import { ConversationService } from "../services/ConversationService"
import { ConversationController } from "../controllers/ConversationController"

import { AuthMiddleware } from "../middlewares/AuthVerify"

export async function ConversationRoutes(app: FastifyInstance): Promise<void> {
	const conversationController: ConversationController =
		new ConversationController(new ConversationService())

	app.get(
		"/user/conversations/:userId",
		{
			preHandler: AuthMiddleware,
		},
		conversationController.getUserConversations.bind(
			conversationController,
		),
	)
}
