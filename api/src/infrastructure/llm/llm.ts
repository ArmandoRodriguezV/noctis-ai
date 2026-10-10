import axios from "axios";
import type { Chat } from "../../domain/entities/Chat.js";

export class LLM {
    constructor(private model: string = "llama3.2", private embeddingModel: string = "nomic-embed-text") { }
    async sendMessage(chats: Chat[]) {
        const obj = {
            model: this.model,
            messages: chats,
            stream: false
        };
        const resp = await axios.post("http://localhost:11434/api/chat", obj);
        return resp.data.message.content;
    }

    async createEmbedding(text: string): Promise<number[]> {
        const obj = {
            model: this.embeddingModel,
            input: text
        };
        const resp = await axios.post("http://localhost:11434/api/embed", obj);
        return resp.data.embeddings[0];
    }
}