import { z } from "zod"

export const PostMessageBodySchema = z.object({
	message: z.string().trim().max(255),
})

export type PostMessageBodyType = z.infer<typeof PostMessageBodySchema>
