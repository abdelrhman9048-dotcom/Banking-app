import express from "express"
import { createCard, getMyCard } from "../controllers/cardController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createCard)

router.get("/", protect, getMyCard)

export default router