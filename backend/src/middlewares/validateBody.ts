import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

type ZodErrorSchema = {
	message: string
	path: string[]
}

export const validateBody =
	(schema: z.ZodType<any, any>) =>
	async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			schema.parse(request.body)
		} catch (err) {
			const { issues } = err as {
				issues: ZodErrorSchema[]
			}

			reply.status(400).send({
				success: false,
				issues: issues.reduce((acc: Record<string, any>, issue) => {
					acc[issue.path[0]] = issue.message

					return acc
				}, {}),
			})
		}
	}
