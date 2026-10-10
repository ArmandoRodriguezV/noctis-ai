import type { ChatRepository } from "../domain/repositories/ChatRepository";

export class LoadMessagesUc {
    constructor(
        private chatRepo: ChatRepository
    ) { }

    async exec() {
        return await this.chatRepo.loadMessages();
    }
}