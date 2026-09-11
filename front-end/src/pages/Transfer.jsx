import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, DollarSign } from "lucide-react"
// axios للتواصل مع الباك-إند
import axios from "axios"

export default function Transfer() {
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    //  دالة التحويل الحقيقية المرتبطة بالسيرفر
    const handleTransfer = async (e) => {
        e.preventDefault()
        
        if (!email || !amount) {
            setMsg("الرجاء إدخال البريد والمبلغ ⚠️")
            return
        }

        try {
            setLoading(true)
            
            // 1. جلب التوكن (ضروري للـ Protected Route)
            const token = localStorage.getItem("token")
            
            //إرسال الطلب للباك )
            const { data } = await axios.post(
                "/transfer", 
                {
                    receiverEmail: email,
                    amount: Number(amount) // تحويل المبلغ لرقم
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            // 3. عرض رسالة النجاح الجاية من السيرفر
            setMsg(data.message || "تم التحويل بنجاح ✅")
            setEmail("")
            setAmount("")
            
        } catch (err) {
            // 4. التعامل مع الأخطاء (رصيد غير كاف، مستخدم غير موجود)
            setMsg(err.response?.data?.message || "حدث خطأ أثناء التحويل ❌")
            
        } finally {
            // إيقاف حالة التحميل سواء نجح أو فشل
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3a0078] to-[#1a237e] p-6">
            <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }} 
                className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white"
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ duration: 0.6 }} 
                    className="text-center mb-8"
                >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Send size={36} className="text-white" />
                    </div> 
                    <h2 className="text-3xl font-extrabold mt-4">تحويل الأموال</h2>
                    <p className="text-gray-300 mt-2 text-sm">
                        قم بإرسال الأموال بسرعة وأمان لأي حساب آخر
                    </p>
                </motion.div>

                {/* النموذج */}
                <form onSubmit={handleTransfer} className="space-y-6">
                    
                    {/*  إضافة مكان لعرض رسائل النجاح أو الخطأ بدل الـ alert */}
                    {msg && (
                        <div className={`text-center p-3 rounded-xl ${msg.includes("✅") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                            {msg}
                        </div>
                    )}

                    {/* حقل البريد الإلكتروني */}
                    <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 focus-within:border-green-400 transition">
                        <Mail className="text-gray-300" />
                        <input 
                            type="email" 
                            placeholder="البريد الإلكتروني للمستلم" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent w-full outline-none text-white placeholder-gray-300"
                        />
                    </div>

                    {/* حقل المبلغ */}
                    <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 focus-within:border-green-400 transition">
                        <DollarSign className="text-gray-300" />
                        <input 
                            type="number" 
                            placeholder="أدخل المبلغ المراد تحويله" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent w-full outline-none text-white placeholder-gray-300"
                        />
                    </div>

                    {/* زر الإرسال */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3.5 rounded-xl font-bold text-white shadow-lg transition disabled:opacity-50"
                    >
                        {loading ? "جاري التحويل..." : "إتمام التحويل"}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}