export interface IConversationService {
	getUserConversations: (userId: number) => Promise<object[]>
}
