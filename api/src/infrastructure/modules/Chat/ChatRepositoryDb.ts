import type { PersonalityType, Character } from "../../../domain/entities/Character.js";
import type { Chat } from "../../../domain/entities/Chat.js";
import type { ChatRepository } from "../../../domain/repositories/ChatRepository.js";
import { blobToFloat32, cosineSimilarity } from "../../configs/embSearcher/embeddings.js";
import { getDB } from "../../db/db.js";

export class ChatRepositoryDb implements ChatRepository {
    async saveToHistory(chat: Chat, embendding: number[]): Promise<void> {
        const db = getDB();
        const buffer = Buffer.from(new Float32Array(embendding).buffer);
        await db.run(`
            INSERT INTO chat (id, role, content, embedding)
            VALUES (?, ?, ?, ?)`,
            [chat.id, chat.role, chat.content, buffer]
        );
    }

    async loadPersonality(character: PersonalityType): Promise<Character> {
        const db = getDB();
        const personality = await db.get(
            `SELECT * FROM character WHERE type = ?`,
            [character]
        );

        return personality;
    }

    async getMemory(embedding: number[]): Promise<Chat[]> {
        const db = getDB();
        const rows = await db.all(`SELECT id, embedding FROM chat WHERE embedding IS NOT NULL`);
        const query = Float32Array.from(embedding);
        const similarities = rows.map(row => {
            const vector = blobToFloat32(row.embedding);
            return {
                id: row.id,
                score: cosineSimilarity(query, vector)
            };
        });
        similarities.sort((a, b) => b.score - a.score);
        const top = similarities.slice(0, 50);
        return db.all(`SELECT * FROM chat WHERE id IN (${top.map(() => "?").join(",")})`, top.map(x => x.id));
    }

    async getAllChats(): Promise<Chat[]> {
        const db = getDB();
        const allChats = await db.all(
            `SELECT id, role, content FROM chat`
        );

        return allChats;
    }
}