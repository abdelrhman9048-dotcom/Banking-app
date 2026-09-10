import express from "express"
import { getAllCards, deleteCard } from "../controllers/adminCardController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getAllCards)

router.delete("/:id", protect, deleteCard)

export default router