import type { Character, PersonalityType } from "../entities/Character.js";
import type { Chat } from "../entities/Chat.js";

export interface ChatRepository {
    saveToHistory(chat: Chat, embendding: number[]): Promise<void>;
    loadPersonality(character: PersonalityType): Promise<Character>;
    getMemory(embbedding: number[]): Promise<Chat[]>;
    getAllChats(): Promise<Chat[]>
}