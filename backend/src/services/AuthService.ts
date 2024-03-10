import { UserRegisterBody } from "../types/UserRegisterBodyType"
import { UserLoginBody } from "../types/UserLoginBodyType"
import { ApiServiceException } from "../errors/ApiServiceException"

import prisma from "../prismaClient"
import bcrypt from "bcrypt"

import { FastifyInstance } from "fastify"
import { IAuthService } from "../types/AuthServiceType"

export class AuthService implements IAuthService {
	constructor(private readonly app: FastifyInstance) {}

	generateToken(username: string): string {
		try {
			const token = this.app.jwt.sign({ username })

			return token
		} catch (err) {
			throw new ApiServiceException("Failed to generate token", 500)
		}
	}

	async verifyUserCredentials({
		username,
		password,
	}: UserLoginBody): Promise<void> {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		})

		if (user === null) {
			throw new ApiServiceException("User not found", 404)
		}

		const isPasswordHashMatched = await bcrypt.compare(
			password,
			user.passwordHash,
		)

		if (isPasswordHashMatched === false) {
			throw new ApiServiceException("Password does not match", 401)
		}
	}

	async registerUser({
		email,
		password,
		username,
	}: UserRegisterBody): Promise<void> {
		try {
			await prisma.user.create({
				data: {
					email,
					username,
					passwordHash: await bcrypt.hash(password, 10),
				},
			})
		} catch (err) {
			throw new ApiServiceException("Failed to create user", 400)
		}
	}
}
