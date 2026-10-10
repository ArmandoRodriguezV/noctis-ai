export interface Chat {
    id?: string;
    role: "user" | "system" | "assistant" | "command";
    content: string;
}