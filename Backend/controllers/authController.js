import jwt from "jsonwebtoken";
import User from "../Model/User.js";

const generateToken = (id) =>
  jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "المستخدم موجود بالفعل" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

  if (
    user &&
    await user.matchPassword(password)
) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        token: generateToken(user._id),
      });

    } else {
      res.status(401).json({
        message: "بيانات الدخول غير صحيحة",
      });
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};