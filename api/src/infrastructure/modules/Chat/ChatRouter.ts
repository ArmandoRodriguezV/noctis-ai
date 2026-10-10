import { Router } from "express";
import chatController from "../../Di/di.js";

const chatRouter = Router();

chatRouter.post("/chat", chatController.sendMessage);
chatRouter.get("/chat/messages", chatController.loadMessages);

export default chatRouter;