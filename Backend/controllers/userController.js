import User from "../Model/User.js";
import Card from "../Model/Cards.js";

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user)
            return res.status(404).json({ message: "User not found" });

        const card = await Card.findOne({ user: req.user._id });

        res.json({
            ...user.toObject(),
            card: card
                ? {
                      balance: card.balance,
                      cardNumber: card.cardNumber,
                      cvv: card.cvv,
                      expiryDate: card.expiryDate
                  }
                : null,
        });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

const user = await User.findById(req.user._id);

if (!user)
    return res.status(404).json({ message: "User not found" });

if (email && email !== user.email) {
    const existing = await User.findOne({ email });

    if (existing)
        return res.status(400).json({
            message: "البريد مستخدم بالفعل"
        });
}

if (name) user.name = name;
if (email) user.email = email;

await user.save();

res.json({
    success: true,
    message: "✅ تم تحديث الملف الشخصي بنجاح",
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
    },
})

    } catch (err) {
        res.status(500).json({ success: false,message: err.message })
    }
}