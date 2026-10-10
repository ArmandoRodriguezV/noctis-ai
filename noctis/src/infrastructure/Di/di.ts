import { LoadMessagesUc } from "../../application/LoadMessagesUc";
import { SendMessageUc } from "../../application/SendMessageUc";
import { ChatRepositoryImpl } from "../ApiImplementation/ChatRepositoryImpl";

// Repositories
const chatRepo = new ChatRepositoryImpl();

// Use cases
const sendMessageUc = new SendMessageUc(chatRepo);
const loadMessagesUc = new LoadMessagesUc(chatRepo);

// exports
export { sendMessageUc, loadMessagesUc };