import axios from "axios";
import type { ChatRepository } from "../../domain/repositories/ChatRepository";
import type { Chat } from "../../domain/entities/Chat";

export class ChatRepositoryImpl implements ChatRepository {
    async sendMessage(message: string): Promise<string> {
        const resp = await axios.post('http://localhost:3921/chat', { message });
        return resp.data;
    }

    async loadMessages(): Promise<Chat[]> {
        const resp = await axios.get('http://localhost:3921/chat/messages');
        return resp.data.messages
    }
}