import { FastifyInstance } from "fastify"

import checkRequiredFields from "../middlewares/CheckRequiredFields"

import { AuthService } from "../services/AuthService"
import { AuthController } from "../controllers/AuthController" // Import the AuthController class

async function AuthRoutes(app: FastifyInstance) {
	const authService: AuthService = new AuthService(app)
	const authController: AuthController = new AuthController(authService) // Instantiate AuthController with authService

	app.post(
		"/login",
		{
			preHandler: checkRequiredFields(["email", "password"]),
		},
		authController.signIn.bind(authController),
	)

	app.post(
		"/register",
		{
			preHandler: checkRequiredFields(["email", "password", "name"]),
		},
		authController.signUp.bind(authController),
	)
}

export default AuthRoutes
