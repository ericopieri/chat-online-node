import prisma from "./prismaClient"
;(async function () {
	await prisma.message.create({
		data: {
			conversationId: 1,
			senderId: 1,
			content: "Como está?",
		},
	})

	prisma.$disconnect()
})()
