import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { Users, CreditCard, DollarSign, Settings } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    cards: 0,
    transactions: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [usersRes, cardsRes, transRes] = await Promise.all([
        axios.get("/admin/users"),
        axios.get("/admin/cards"),
        axios.get("/admin/transactions"),
      ]);

      setStats({
        users: usersRes.data?.length || 0,
        cards: cardsRes.data?.length || 0,
        transactions: transRes.data?.length || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cardsData = [
    {
      title: "عدد المستخدمين",
      value: stats.users,
      icon: <Users size={28} className="text-blue-400" />,
      color: "from-purple-500/20 to-purple-600/10",
    },
    {
      title: "عدد البطاقات",
      value: stats.cards,
      icon: <CreditCard size={28} className="text-blue-400" />,
      color: "from-purple-500/20 to-purple-600/10",
    },
    {
      title: "عدد المعاملات",
      value: stats.transactions,
      icon: <DollarSign size={28} className="text-green-400" />,
      color: "from-green-500/20 to-green-600/10",
    },
    {
      title: "الإعدادات",
      value: "لوحة التحكم",
      icon: <Settings size={28} className="text-blue-400" />,
      color: "from-purple-500/20 to-purple-600/10",
    },
  ];

  return (
    <div className="min-h-screen pt-36 bg-linear-to-br from-[#0a0f1f] via-[#1a237e] to-[#3f51b5] text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-7xl mx-auto text-center"
      >
        <h1 className="text-4xl font-extrabold mb-4 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          👋 أهلا بك أيها المدير
        </h1>
        <p className="text-gray-300 text-lg mb-12">
          يمكنك من هنا إدارة المستخدمين، البطاقات، والمعاملات بسهولة واحترافية
        </p>

        {loading ? (
          <div className="text-gray-400 text-lg">...جاري تحميل الإحصائيات</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
            {cardsData.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl bg-linear-to-br ${s.color} backdrop-blur-md border border-white/10 shadow-lg
                shadow-black/30 hover:bg-white/10 transition-all`}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="p-3 bg-white/20 rounded-full">{s.icon}</div>

                  <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                  <p className="text-2xl font-bold text-indigo-300">{s.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
