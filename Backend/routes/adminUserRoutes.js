import express from "express"
import { getAllUsers, deleteUser, updateUserBalance } from "../controllers/adminUserController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getAllUsers)

router.delete("/:id", protect, deleteUser)

router.put("/:id/balance", protect, updateUserBalance)

export default router