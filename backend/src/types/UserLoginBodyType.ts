import { z } from "zod"

const UserLoginBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

type UserLoginBody = z.infer<typeof UserLoginBodySchema>

export { UserLoginBody, UserLoginBodySchema }
