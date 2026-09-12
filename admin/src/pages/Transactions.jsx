import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, Repeat, User, DollarSign } from "lucide-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const { data } = await axios.get("/admin/transactions");
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTransactions();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "deposit":
        return <ArrowDownCircle className="text-green-400" size={20} />;
      case "withdraw":
        return <ArrowUpCircle size={20} className="text-red-400" />;
      case "transfer":
        return <Repeat size={20} className="text-blue-400" />;
      default:
        return <DollarSign size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen p-8 bg-linear-to-br from-[#0a0f1f] via-[#1a237e] to-[#3f51b5] text-white">
      <div className="max-w-7xl mx-auto p-8 rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-linear-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
          🔒 سجل المعاملات
        </h2>

        {transactions.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">لا توجد معاملات بعد.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {transactions.map((t, index) => (
              <motion.div
                key={t._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 80 }}
                className="relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md
                hover:bg-white/10 hover:scale-[1.03] transition-all shadow-lg shadow-black/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getIcon(t.type)}
                    <h3 className="text-lg font-bold capitalize">
                      {t.type === "deposit"
                        ? "إيداع"
                        : t.type === "withdraw"
                        ? "سحب"
                        : "تحويل"}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      t.type === "deposit"
                        ? "bg-green-500/20 text-green-300"
                        : t.type === "withdraw"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {t.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={16} className="text-indigo-300" />
                  <span className="font-semibold text-lg text-white">${t.amount}</span>
                </div>

                <div className="flex items-center gap-2 text-green-300 text-sm mb-1">
                  <User size={15} className="text-indigo-400" />
                  {t.user?.email || "مستخدم محذوف"}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {t.createdAt ? new Date(t.createdAt).toLocaleString("ar-EG") : ""}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
