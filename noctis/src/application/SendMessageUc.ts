import type { ChatRepository } from "../domain/repositories/ChatRepository";

export class SendMessageUc {
    constructor(
        private chatRepo: ChatRepository
    ) { }

    async exec(msg: string) {
        return await this.chatRepo.sendMessage(msg);
    }
}