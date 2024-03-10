import { z } from "zod"

const UserLoginBodySchema = z.object({
	username: z.string().min(3).max(25),
	password: z.string().min(8),
})

type UserLoginBody = z.infer<typeof UserLoginBodySchema>

export { UserLoginBody, UserLoginBodySchema }
