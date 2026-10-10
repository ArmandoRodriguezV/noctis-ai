
import { useEffect, useState } from "react";
import { loadMessagesUc, sendMessageUc } from "../../../infrastructure/Di/di";
import type { Chat } from "../../../domain/entities/Chat";

export default function homeVM() {
    const [isProcess, setProcess] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Chat[]>([]);

    const loadMessages = async () => {
        try {
            const msgs = await loadMessagesUc.exec();
            setMessages(msgs);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const onMessage = (event: any) => {
        setMessage(event.target.value);
    };

    const send = async () => {
        const text = message.trim();
        if (!text || isProcess) return;

        setProcess(true);
        setMessage("");

        try {
            const userMessage = {
                role: "user",
                content: text
            } as Chat;

            setMessages(prev => [...prev, userMessage]);
            await sendMessageUc.exec(text);
            await loadMessages();
        } catch (err) {
            console.error(err);
            setMessage(text);
            await loadMessages();
        } finally {
            setProcess(false);
        }
    };

    return { onMessage, isProcess, send, messages, message };
}