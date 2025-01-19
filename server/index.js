import express from 'express'
import dotenv from 'dotenv'
import connect from './config/db.js';
import path from 'path'
import {fileURLToPath} from 'url'
import emailRouter from './routes/emailRoute.js';
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", emailRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
})

app.listen(PORT, async()=>{
    await connect();
    console.log("Server stared on port" + PORT);
})