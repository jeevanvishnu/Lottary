import express from "express";
import { login, logout, addLottery, editLottery, deleteLottery, getLotteries } from "../../controllers/admin/admin.controller.ts";
import { verifyAdmin } from "../../middlewares/adminAuth.ts";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/lottery", verifyAdmin, addLottery);
router.put("/lottery/:id", verifyAdmin, editLottery);
router.delete("/lottery/:id", verifyAdmin, deleteLottery);
router.get("/lotteries", getLotteries);

export default router