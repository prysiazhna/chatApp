import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouts from "./routs/auth.routs.js";
import messagesRouts from "./routs/messages.routs.js";
import usersRouts from "./routs/user.routs.js";
import {connectToMongoDB} from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    //root route  http://localhost:3000/
    res.send("Hello");
})

app.use("/api/auth", authRouts);
app.use("/api/messages", messagesRouts);
app.use("/api/users", usersRouts);
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`121212 ${PORT}`);
});