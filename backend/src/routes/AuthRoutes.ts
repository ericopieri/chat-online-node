import { FastifyInstance } from "fastify"

import { validateBody } from "../middlewares/validateBody"

import { AuthService } from "../services/AuthService"
import { AuthController } from "../controllers/AuthController"
import { UserRegisterBodySchema } from "../types/UserRegisterBodyType"
import { UserLoginBodySchema } from "../types/UserLoginBodyType"

export async function AuthRoutes(app: FastifyInstance) {
	const authService: AuthService = new AuthService(app)
	const authController: AuthController = new AuthController(authService)

	app.post(
		"/login/",
		{
			preHandler: validateBody(UserLoginBodySchema),
		},
		authController.signIn.bind(authController),
	)

	app.post(
		"/register/",
		{
			preHandler: validateBody(UserRegisterBodySchema),
		},
		authController.signUp.bind(authController),
	)
}
