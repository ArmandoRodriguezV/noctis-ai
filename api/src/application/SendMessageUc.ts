import { randomUUID } from "node:crypto";
import type { Chat } from "../domain/entities/Chat.js";
import type { ChatRepository } from "../domain/repositories/ChatRepository.js";
import { LLM } from "../infrastructure/llm/llm.js";

export class SendMessageUc {
    constructor(
        private chatRepo: ChatRepository,
        private llm: LLM
    ) { }

    async exec(message: string) {
        const userChat: Chat = {
            id: randomUUID(),
            role: "user",
            content: message
        };

        const userEmbedding = await this.llm.createEmbedding(message);
        await this.chatRepo.saveToHistory(userChat, userEmbedding);

        const context = await this.chatRepo.getMemory(userEmbedding);
        const personality = await this.chatRepo.loadPersonality("Funny");


        const system: Chat = {
            id: randomUUID(),
            role: "system",
            content: `${personality.character}`
        };

        const allMessages = [...context, system, userChat];
        const response = await this.llm.sendMessage(allMessages);

        const llmChat: Chat = {
            id: randomUUID(),
            role: "assistant",
            content: JSON.stringify(response)
        };

        const llmEmbedding = await this.llm.createEmbedding(response.message);
        await this.chatRepo.saveToHistory(llmChat, llmEmbedding);

        return response;
    }
}