import { z } from "zod"

const UserRegisterBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	username: z.string().min(3).max(25),
})

type UserRegisterBody = z.infer<typeof UserRegisterBodySchema>

export { UserRegisterBody, UserRegisterBodySchema }
