import { z } from "zod"

export const RequestUserSchema = z.object({
	username: z.string().min(3).max(25),
})

export type RequestUserType = z.infer<typeof RequestUserSchema>
