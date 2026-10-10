import { SendMessageUc } from "../../application/SendMessageUc.js";
import { ChatController } from "../modules/Chat/ChatController.js";
import { ChatRepositoryDb } from "../modules/Chat/ChatRepositoryDb.js";
import { LLM } from "../llm/llm.js";
import { LoadMessagesUc } from "../../application/LoadMessagesUc.js";

// Resources
const chatRepo = new ChatRepositoryDb();
const llm = new LLM();

// use cases
const sendMessageUc = new SendMessageUc(chatRepo, llm);
const loadMessagesUc = new LoadMessagesUc(chatRepo);

// Controllers
const chatController = new ChatController(sendMessageUc, loadMessagesUc);

export default chatController;