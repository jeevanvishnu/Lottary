import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns"

dns.setServers(["8.8.8.8", "8.8.4.4"])

dotenv.config();

export const connectDb = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log("Database connection Failed", error)
    }
}