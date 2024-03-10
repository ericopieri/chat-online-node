export interface IMessageService {
	postMessage(
		message: string,
		users: { sender: string; receiver: string },
	): Promise<void>
}
