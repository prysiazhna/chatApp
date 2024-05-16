import mongoose from "mongoose";

export const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to db");

    } catch (error) {
        console.log("Error to connect to db", error.message);
    }
}