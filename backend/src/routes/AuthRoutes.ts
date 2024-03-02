import { FastifyInstance } from "fastify"
import bcrypt from "bcrypt"

import prisma from "../prismaClient"

import checkRequiredFields from "./decorators/CheckRequiredFields"

type UserLoginInfo = {
	email: string
	password: string
}

type UserRegisterInfo = {
	email: string
	password: string
	name: string
}

async function AuthRoutes(app: FastifyInstance): Promise<void> {
	app.post(
		"/login",
		{
			preHandler: checkRequiredFields(["email", "password"]),
		},
		async (request, reply) => {
			const { email, password } = request.body as UserLoginInfo

			try {
				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				})

				if (user === null) {
					reply.code(404).send({
						message: "User not found",
					})

					return
				}

				const isPasswordHashMatched = await bcrypt.compare(
					password,
					user.passwordHash,
				)

				if (isPasswordHashMatched === false) {
					reply.code(401).send({
						message: "Invalid password",
					})

					return
				}

				const token = app.jwt.sign({
					userId: user.id,
				})

				return reply.send({
					token,
				})
			} catch (err) {
				reply.code(500).send({
					message: err,
				})
			}
		},
	)

	app.post("/register", async (request, reply) => {
		const { email, password, name } = request.body as UserRegisterInfo

		try {
			await prisma.user.create({
				data: {
					email,
					passwordHash: await bcrypt.hash(password, 10),
					name,
				},
			})

			return reply.code(201).send()
		} catch (err) {
			reply.code(500).send(err)
		}
	})
}

export default AuthRoutes
