import type { Request, Response } from "express";
import { Admin } from "../../models/admin/admin.model.ts";
import { Lottery } from "../../models/admin/lottery.model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1d" }
        );

        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ message: "Login successful", token, admin: { id: admin._id, email: admin.email } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("admin_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    res.status(200).json({ message: "Logout successful" });
};

export const addLottery = async (req: Request, res: Response) => {
    try {
        const { lotteryNo, lotteryName, price, date, time, jackpotAmount, image } = req.body;

        if (!lotteryNo || !lotteryName || !price || !date || !time || !jackpotAmount || !image) {
            return res.status(400).json({ message: "All required fields must be provided, including an image" });
        }

        const newLottery = new Lottery({
            lotteryNo,
            lotteryName,
            price,
            date,
            time,
            jackpotAmount,
            image
        });

        await newLottery.save();
        res.status(201).json({ message: "Lottery added successfully", lottery: newLottery });
    } catch (error) {
        console.error("Error adding lottery:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editLottery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedLottery = await Lottery.findByIdAndUpdate(id, updates, { new: true });
        
        if (!updatedLottery) {
            return res.status(404).json({ message: "Lottery not found" });
        }

        res.status(200).json({ message: "Lottery updated successfully", lottery: updatedLottery });
    } catch (error) {
        console.error("Error editing lottery:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteLottery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedLottery = await Lottery.findByIdAndDelete(id);

        if (!deletedLottery) {
            return res.status(404).json({ message: "Lottery not found" });
        }

        res.status(200).json({ message: "Lottery deleted successfully" });
    } catch (error) {
        console.error("Error deleting lottery:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLotteries = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const totalLotteries = await Lottery.countDocuments();
        const lotteries = await Lottery.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            lotteries,
            pagination: {
                total: totalLotteries,
                page,
                limit,
                totalPages: Math.ceil(totalLotteries / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching lotteries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};