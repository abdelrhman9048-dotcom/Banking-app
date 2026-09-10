import Card from "../models/Card.js";
import User from "../models/User.js";

export const getAllCards = async (req, res) => {
    const cards = await Card.find().populate("user", "name email")
    res.json(cards);
};

export const deleteCard = async (req, res) => {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "تم حذف البطاقة" });
};