import { useEffect, useState, useContext, useCallback } from "react";
import axios from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const Cards = () => {
  const { admin } = useContext(AdminAuthContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  if (!admin) return <p className="p-6 text-center text-red-400">يجب تسجيل الدخول كأدمن</p>;
  const token = admin?.token || localStorage.getItem("adminToken");

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("/admin/cards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards(data.data ?? data ?? []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const deleteCard = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه البطاقة؟")) return;
    try {
      setDeleting(id);
      await axios.delete(`/admin/cards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCards();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const formatCardNumber = (num = "") => {
    const clean = String(num).replace(/\D/g, "");
    if (!clean) return "0000 0000 0000 0000";
    const groups = clean.match(/.{1,4}/g) || [];
    return groups.join(" ");
  };

  const formatExpiry = (exp) => {
    if (!exp) return "MM/YY";
    return exp;
  };

  return (
    <div className="min-h-screen p-8 bg-linear-to-br from-[#0a0f1f] via-[#1a237e] to-[#3f51b5] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-center">💳 إدارة البطاقات</h2>

        {loading ? (
          <div className="text-center text-gray-300 py-12">...جار تحميل البطاقات</div>
        ) : error ? (
          <div className="text-center text-red-400 py-6">{error}</div>
        ) : cards.length === 0 ? (
          <div className="text-center text-gray-300 py-12">لا توجد بطاقات حاليًا</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden p-6 shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,215,64,0.8) , rgba(59,0,128,0.18))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="rounded-xl p-6 bg-linear-to-r from-[#0f1724]/40 via-[#2b1460]/30 to-[#4b2b7f]/35
                  backdrop-blur-md border border-white/5"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-sm text-gray-300">نوع البطاقة</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="w-10 h-7 rounded-md bg-linear-to-r from-yellow-400 to-orange-500
                          flex items-center justify-center text-black font-semibold shadow"
                        >
                          VISA
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-400">الرصيد</div>
                      <div className="text-lg font-bold text-yellow-300">
                        ${Number(c.balance ?? 0).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-xl tracking-widest font-mono">
                      {formatCardNumber(c.cardNumber)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-300">
                    <div>
                      <div className="text-[11px] text-gray-400">المستخدم</div>
                      <div className="mt-1 font-medium">
                        {c.user?.name ?? c.user?.email ?? "غير معروف"}
                      </div>
                      <div className="text-xs text-gray-400">{c.user?.email ?? ""}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-gray-400">ينتهي</div>
                      <div className="mt-1 font-medium">{formatExpiry(c.expiry)}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-300">رقم: {c._id.slice(-6)}</div>

                    <button
                      onClick={() => deleteCard(c._id)}
                      disabled={deleting === c._id}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold
                      transition ${
                        deleting === c._id
                          ? "bg-red-500/60 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleting === c._id ? "جارٍ الحذف..." : "حذف"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
