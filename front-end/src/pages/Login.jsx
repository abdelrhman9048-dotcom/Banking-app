import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Lock, Mail, LogIn } from "lucide-react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
    const { login, user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    const onSubmit = async (data) => {
        try {
            // 
            await login(data.email, data.password)
            navigate("/")
        } catch (err) {
            console.error(err)
            alert("بيانات الدخول غير صحيحة ❌")
        }
    }

    return (
        // 
        <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0020] via-[#3b008f] to-[#b38bff] p-6">
            <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }} 
                className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white"
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }} 
                    className="text-center mb-10"
                >
                    {/* ✅ تصحيح: bg-linear-to-br → bg-gradient-to-br */}
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <LogIn size={36} />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-wide">تسجيل الدخول</h2>
                    <p className="text-gray-300 mt-2">مرحباً بك في نظام NeoBank الآمن 🔐</p>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Mail className="text-yellow-300" size={18} />
                            <label className="text-sm text-gray-200">البريد الإلكتروني</label>
                        </div>
                        <input 
                            {...register("email", { required: true })} 
                            type="email" 
                            placeholder="example@gmail.com"
                            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">البريد مطلوب</p>}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Lock className="text-yellow-300" size={18} />
                            <label className="text-sm text-gray-200">كلمة المرور</label>
                        </div>
                        <input 
                            {...register("password", { required: true })} 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">كلمة المرور مطلوبة</p>}
                    </div>

                    {/* ✅ تصحيح: bg-linear-to-r → bg-gradient-to-r */}
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-yellow-400 text-white py-3 rounded-xl font-bold shadow-lg transition disabled:opacity-50"
                    >
                        {isSubmitting ? "...جاري تسجيل الدخول" : "دخول"}
                    </motion.button>
                </form>

                {/* ✅ تصحيح: bg-linear-to-r → bg-gradient-to-r */}
                <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.4 }} 
                    className="h-0.5 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mt-10 rounded-full" 
                />

                <div className="text-center mt-6 text-gray-300 text-sm">
                    <p>© 2025 NeoBank - نظام مصرفي ذكي وآمن 💳</p>
                </div>
            </motion.div>
        </div>
    )
}

export default Login