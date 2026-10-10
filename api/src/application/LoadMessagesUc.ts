import type { ChatRepository } from "../domain/repositories/ChatRepository.js";

export class LoadMessagesUc {
    constructor(
        private chatRepo: ChatRepository
    ) { }

    async exec() {
        return await this.chatRepo.getAllChats();
    }
}