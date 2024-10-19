import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouts from "./routs/auth.routs.js";
import messagesRouts from "./routs/messages.routs.js";
import usersRouts from "./routs/user.routs.js";
import {connectToMongoDB} from "./db/connectToMongoDB.js";
import {app, server} from "./socket/socket.js";
import uploadRouts from "./routs/upload.routs.js";
import path from "path";
import cors from "cors";

const PORT = process.env.PORT || 3000;

dotenv.config();
const __dirname = path.resolve();

app.use(cors({
    origin: "https://prysiazhna-chat-app.vercel.app", // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Ensure that credentials are allowed (cookies, etc.)
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token", "Set-Cookie"],
    exposedHeaders: ["Set-Cookie"], // Expose the headers that might be needed
}));

// Handle preflight requests
app.options('*', cors()); 

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRouts);
app.use("/api/messages", messagesRouts);
app.use("/api/upload", uploadRouts);
app.use("/api/users", usersRouts);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(3000, () => {
    connectToMongoDB();
    console.log(`PORT ${PORT}`);
});
