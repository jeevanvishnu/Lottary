import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDb} from "./config/db.ts"
import cookieParser from "cookie-parser";
import adminRouter from "./routers/admin/admin.router.ts";

dotenv.config();

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://lottary-ulcr.vercel.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;


const startServer = () => {
    connectDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();