import express from "express"
import { deposit, withdraw, getTransactions } from "../controllers/transactionController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/deposit", protect, deposit)

router.post("/withdraw", protect, withdraw)

router.get("/", protect, getTransactions)

export default router