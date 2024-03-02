import { FastifyReply, FastifyRequest } from "fastify"

const checkRequiredFields =
	(requiredFields: string[]) =>
	async (request: FastifyRequest, reply: FastifyReply) => {
		const body = request.body as Record<string, any>
		const missingFields: Record<string, string> = {}

		for (const field of requiredFields) {
			if (!(field in body) || !body[field]) {
				missingFields[field] = "Required field"
			}
		}

		if (Object.keys(missingFields).length > 0) {
			reply.code(400).send(missingFields)
			return
		}

		return
	}

export default checkRequiredFields
