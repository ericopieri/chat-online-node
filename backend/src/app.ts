import Fastify from "fastify"
import UserRoutes from "./routes/UserRoutes"
import AuthRoutes from "./routes/AuthRoutes"

import jwt from "@fastify/jwt"

const app = Fastify({
	logger: true,
})

app.register(jwt, {
	secret: "supersecret",
})

app.register(AuthRoutes)
app.register(UserRoutes)

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
