import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './infrastructure/db/db.js';
import cors from 'cors';
import chatRouter from './infrastructure/modules/Chat/ChatRouter.js';

dotenv.config();
await connectDb();
const PORT = process.env.PORT || 3921;

const app = express();

app.use(cors())
app.use(express.json());

app.use(chatRouter);

app.listen(PORT, () => {
    console.log(`Server listen to port ${PORT}`)
})