import { ApiServiceException } from "../errors/ApiServiceException"
import prisma from "../prismaClient"

export class UserService {
	static async getUserIDbyUsername(
		username: string,
	): Promise<number | undefined> {
		const user = await prisma.user.findFirst({
			where: {
				username,
			},
			select: {
				id: true,
			},
		})

		return user?.id
	}
}
