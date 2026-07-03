import type { Request, Response } from "express";
import { Admin } from "../../models/admin/admin.model.ts";
import { Lottery } from "../../models/admin/lottery.model.ts";
import { Result } from "../../models/admin/result.model.ts";
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
        const { lotteryNo, lotteryName, price, date, time, jackpotAmount, image, type } = req.body;

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
            image,
            type: type || 'regular'
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

        const updatedLottery = await Lottery.findByIdAndUpdate(id, updates, { returnDocument: 'after' });
        
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

// ─── Result Controllers ───────────────────────────────────────────────────────

export const addResult = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data.draw_date || !data.draw_name || !data.draw_code) {
            return res.status(400).json({ message: "draw_date, draw_name and draw_code are required" });
        }
        const newResult = new Result(data);
        await newResult.save();
        res.status(201).json({ message: "Result published successfully", result: newResult });
    } catch (error) {
        console.error("Error adding result:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getResults = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const total = await Result.countDocuments();
        const results = await Result.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("draw_date draw_name draw_code first.ticket createdAt");

        res.status(200).json({
            results,
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLatestResult = async (_req: Request, res: Response) => {
    try {
        const result = await Result.findOne().sort({ createdAt: -1 });
        if (!result) return res.status(404).json({ message: "No results published yet" });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching latest result:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getResultById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Result.findById(id);
        if (!result) return res.status(404).json({ message: "Result not found" });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching result:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteResult = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Result.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Result not found" });
        res.status(200).json({ message: "Result deleted successfully" });
    } catch (error) {
        console.error("Error deleting result:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ─── External API Proxy Controllers ──────────────────────────────────────────

const EXTERNAL_API = "https://indialotteryapi.com/wp-json/klr/v1";

export const proxyLatest = async (_req: Request, res: Response) => {
    try {
        const response = await fetch(`${EXTERNAL_API}/latest`);
        if (!response.ok) throw new Error(`External API error: ${response.status}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error proxying latest result:", error);
        res.status(502).json({ message: "Failed to fetch from external API" });
    }
};

export const proxyByDate = async (req: Request, res: Response) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ message: "date query parameter is required" });
        const response = await fetch(`${EXTERNAL_API}/by-date?date=${date}`);
        if (!response.ok) throw new Error(`External API error: ${response.status}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error proxying result by date:", error);
        res.status(502).json({ message: "Failed to fetch from external API" });
    }
};

export const proxyHistory = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const response = await fetch(`${EXTERNAL_API}/history?limit=${limit}&offset=${offset}`);
        if (!response.ok) throw new Error(`External API error: ${response.status}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error proxying history:", error);
        res.status(502).json({ message: "Failed to fetch from external API" });
    }
};