export interface IConversationService {
	getUserConversations: (username: string) => Promise<object[]>
}
