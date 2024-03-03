import { FastifyReply, FastifyRequest } from "fastify"
import { AuthService } from "../services/AuthService"

import { UserLoginBody } from "../types/UserLoginBodyType"
import { UserRegisterBody } from "../types/UserRegisterBodyType"

import { IAuthController } from "../types/AuthControllerType"
import { ApiServiceException } from "../errors/ApiServiceException"

export class AuthController implements IAuthController {
	constructor(private readonly authService: AuthService) {}

	async signIn(request: FastifyRequest, reply: FastifyReply) {
		const { email, password } = request.body as UserLoginBody

		try {
			await this.authService.verifyUserCredentials({ email, password })
		} catch (err) {
			const { code, message } = err as ApiServiceException

			return reply.code(code).send({
				success: false,
				message: message,
			})
		}

		const token = this.authService.generateToken(email)

		return reply.send({ success: true, token })
	}

	async signUp(request: FastifyRequest, reply: FastifyReply) {
		const { email, password, name } = request.body as UserRegisterBody

		try {
			await this.authService.registerUser({ email, password, name })
		} catch (err) {
			const { code, message } = err as ApiServiceException

			return reply.code(code).send({
				success: false,
				message: message,
			})
		}

		return reply.code(201).send()
	}
}
