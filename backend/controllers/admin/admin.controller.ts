import type { Request, Response } from "express";
import { Admin } from "../../models/admin/admin.model.ts";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid password or email" });
        }

        const checkPassword = await bcrypt.compare(password, admin.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid password or email" });
        }

        res.status(200).json({ message: "Login successful", admin: { id: admin._id, email: admin.email } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}