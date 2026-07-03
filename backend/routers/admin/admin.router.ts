import express from "express";
import { login, logout, addLottery, editLottery, deleteLottery, getLotteries, addResult, getResults, getLatestResult, getResultById, deleteResult, proxyLatest, proxyByDate, proxyHistory } from "../../controllers/admin/admin.controller.ts";
import { verifyAdmin } from "../../middlewares/adminAuth.ts";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/lottery", verifyAdmin, addLottery);
router.put("/lottery/:id", verifyAdmin, editLottery);
router.delete("/lottery/:id", verifyAdmin, deleteLottery);
router.get("/lotteries", getLotteries);

// Stored result routes
router.post("/result", verifyAdmin, addResult);
router.get("/results", getResults);
router.get("/result/latest", getLatestResult);
router.get("/result/:id", getResultById);
router.delete("/result/:id", verifyAdmin, deleteResult);

// External API proxy routes (CORS-safe)
router.get("/proxy/latest", proxyLatest);
router.get("/proxy/by-date", proxyByDate);
router.get("/proxy/history", proxyHistory);

export default router