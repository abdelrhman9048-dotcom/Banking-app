import express from "express"
import { getAllTransactions } from "../controllers/adminTransactionController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getAllTransactions)

export default router