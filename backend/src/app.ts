import Fastify from "fastify"
import jwt from "@fastify/jwt"

import { AuthRoutes } from "./routes/AuthRoutes"
import { ConversationRoutes } from "./routes/ConversationRoutes"

const app = Fastify({
	logger: true,
})

app.register(jwt, {
	secret: "supersecret",
})
app.register(AuthRoutes)
app.register(ConversationRoutes)

app.listen(
	{
		port: 3000,
	},
	(err, address) => {
		if (err) {
			app.log.error(err)
			process.exit(1)
		}

		app.log.info(`server listening on ${address}! 🚀`)
	},
)
