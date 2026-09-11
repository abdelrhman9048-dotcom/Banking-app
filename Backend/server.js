import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import cardTransactionRoutes from "./routes/cardTransactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminCardRoutes from "./routes/adminCardRoutes.js";
import adminTransactionRoutes from "./routes/adminTransactionRoutes.js";
import depositRoutes from "./routes/depositRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/card-transactions', cardTransactionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/cards', adminCardRoutes);
app.use('/api/admin/transactions', adminTransactionRoutes);
app.use('/api/deposit', depositRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/admin/users', adminUserRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));