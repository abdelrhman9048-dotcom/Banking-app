import express from "express"
import { transfer } from "../controllers/transferController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", protect, transfer)

export default router