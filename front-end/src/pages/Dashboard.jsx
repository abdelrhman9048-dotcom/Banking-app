import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const Dashboard = () => {
    const [user, setUser] = useState({ name: "سلمى" });
    const [userBalance, setUserBalance] = useState(1200.5);
    const [cardBalance, setCardBalance] = useState(350.75);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleStripeDeposit = () => {
        const numAmount = Number(amount);
        if (!amount || isNaN(numAmount) || numAmount <= 0) {
            alert("الرجاء ادخال مبلغ صحيح");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setUserBalance((prev) => prev + numAmount);
            setAmount("");
            setLoading(false);
            alert(`تم ايداع ${numAmount} في حسابك بنجاح`);
        }, 1200);
    };

    const handleTransaction = (type) => {
        const numAmount = Number(amount);
        if (!amount || isNaN(numAmount) || numAmount <= 0) {
            alert("الرجاء ادخال مبلغ صحيح");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            switch (type) {
                case "withdraw":
                    if (userBalance >= numAmount) {
                        setUserBalance((prev) => prev - numAmount);
                        alert(`تم سحب ${numAmount} بنجاح`);
                    } else {
                        alert("رصيدك غير كافي");
                    }
                    break;

                case "to-card":
                    if (userBalance >= numAmount) {
                        setUserBalance((prev) => prev - numAmount);
                        setCardBalance((prev) => prev + numAmount);
                        alert(`تم تحويل ${numAmount} الى البطاقة`);
                    } else {
                        alert("رصيدك غير كافي");
                    }
                    break;

                case "to-account":
                    if (cardBalance >= numAmount) {
                        setCardBalance((prev) => prev - numAmount);
                        setUserBalance((prev) => prev + numAmount);
                        alert(`تم تحويل ${numAmount} الى الحساب`);
                    } else {
                        alert("رصيد البطاقة غير كافي");
                    }
                    break;

                default:
                    alert("نوع العملية غير معروف");
            }
            setLoading(false);
            setAmount("");
        }, 1000);
    };

    return (
        <div className="pt-2 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1f] via-[#1a237e] to-[#3f51b5] p-6 relative w-full">
            <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }} 
                className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl text-white p-8"
            >
                <div className="text-center mb-10">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <Wallet size={42} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-wide">مرحباً {user?.name || "مستخدم"}</h2>
                    <p className="text-gray-300 mt-2">إدارة حسابك البنكي بسهولة وأمان</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <motion.div className="bg-gradient-to-r from-purple-700/60 to-pink-500/50 p-6 rounded-2xl text-center shadow-lg">
                        <h3 className="text-lg text-gray-200">رصيد الحساب</h3>
                        <p className="text-3xl font-bold mt-2 text-yellow-300">${userBalance.toFixed(2)}</p>
                    </motion.div>
                    <motion.div className="bg-gradient-to-r from-blue-700/60 to-cyan-500/50 p-6 rounded-2xl text-center shadow-lg">
                        <h3 className="text-lg text-gray-200">رصيد البطاقة</h3>
                        <p className="text-3xl font-bold mt-2 text-green-300">${cardBalance.toFixed(2)}</p>
                    </motion.div>
                </div>

                <input 
                    type="number" 
                    placeholder="أدخل المبلغ" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mb-6 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
                />

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
                    <button 
                        onClick={handleStripeDeposit} 
                        disabled={loading} 
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition"
                    >
                        {loading ? "..." : "إيداع عبر Stripe"}
                    </button>

                    <button 
                        onClick={() => handleTransaction("withdraw")} 
                        disabled={loading} 
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition"
                    >
                        {loading ? "..." : "سحب"}
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button 
                        onClick={() => handleTransaction("to-card")} 
                        disabled={loading} 
                        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition"
                    >
                        {loading ? "..." : "تحويل الى البطاقة"}
                    </button>

                    <button 
                        onClick={() => handleTransaction("to-account")} 
                        disabled={loading} 
                        className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition"
                    >
                        {loading ? "..." : "تحويل الى الحساب"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;