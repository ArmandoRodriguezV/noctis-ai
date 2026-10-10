import type { Chat } from "../entities/Chat";

export interface ChatRepository {
    sendMessage(message: string): Promise<string>;
    loadMessages(): Promise<Chat[]>
}