import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import dns from "dns";
import { Admin } from "../../models/admin/admin.model.ts";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongodb");
    } catch (error) {
        console.error("Connection error:", error);
        process.exit(1);
    }
}

await connect();

const Email = process.env.EMAIL;
const Password = process.env.ADMIN_PASSWORD;

try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(Password, salt);

    const admin = await Admin.create({
        email: Email,
        password: hashPassword
    });

    console.log("Admin created successfully:", admin);
} catch (error) {
    console.error("Error creating admin:", error);
} finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}