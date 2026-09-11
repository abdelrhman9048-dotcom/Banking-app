import mongoose from "mongoose"

const cardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cardNumber: { type: String, required: true },
    cvv: { type: String, required: true },
    expiryDate: { type: String, required: true },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Card", cardSchema)