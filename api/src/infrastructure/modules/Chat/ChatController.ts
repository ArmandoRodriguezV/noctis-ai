import type { Request, Response } from "express";
import type { SendMessageUc } from "../../../application/SendMessageUc.js";
import type { LoadMessagesUc } from "../../../application/LoadMessagesUc.js";

export class ChatController {
    constructor(
        private sendMessageUc: SendMessageUc,
        private loadMessagesUc: LoadMessagesUc
    ) { }

    sendMessage = async (req: Request, res: Response) => {
        try {
            const { message } = req.body;
            const llmRespo = await this.sendMessageUc.exec(message);
            res.status(200).json({ message: llmRespo });
        } catch (err) {
            console.error(err);
        }
    }

    loadMessages = async (_req: Request, res: Response) => {
        try {
            const chats = await this.loadMessagesUc.exec();
            res.status(200).json({ messages: chats });
        } catch (err) {
            console.error(err);
        }
    }
}