import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin/admin.model.ts";

export interface AuthenticatedRequest extends Request {
    admin?: {
        id: string;
        email: string;
    };
}

export const verifyAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.admin_token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "default_secret"
        ) as { id: string; email: string };

        const admin = await Admin.findById(decoded.id).select("-password");
        if (!admin) {
            return res.status(401).json({ message: "Unauthorized: Admin not found" });
        }

        req.admin = {
            id: admin._id.toString(),
            email: admin.email,
        };

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
