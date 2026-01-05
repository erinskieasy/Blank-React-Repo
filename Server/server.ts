import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;



// Configure CORS for Better Auth
app.use(cors({
    origin: [`http://localhost:${CLIENT_PORT}`, `http://localhost:${PORT}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Better Auth Handler
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.ts";

app.use("/api/auth", toNodeHandler(auth));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
