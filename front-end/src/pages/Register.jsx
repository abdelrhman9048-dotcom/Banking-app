import { useContext, useEffect } from "react" // إضافة useEffect
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Mail, Lock, UserPlus } from "lucide-react"
import { AuthContext } from "../context/AuthContext" // استيراد الـ Context

const schema = yup.object({
  name: yup.string().required("الاسم مطلوب"),
  email: yup.string().email("بريد إلكتروني غير صالح").required("البريد مطلوب"),
  password: yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
})

const Register = () => {
  //  ربط بالـ Context بنفس الطريقة اللي في الصورة
  const { register: signup, user } = useContext(AuthContext)
  
  const navigate = useNavigate()

  // منع المستخدم المسجل دخول من رؤية صفحة التسجيل
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password)
      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ أثناء التسجيل")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1f] via-[#101a3a] to-[#1a237e] p-6">

      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}}
      transition={{duration:1}} className="w-full max-w-md bg-white/10 backdrop-blur-2xl
      border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

        <motion.div initial={{scale:0.9 , opacity:0}} animate={{scale:1,opacity:1}}
        transition={{duration:0.8}} className="text-center mb-10">

          {}
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-purple-600
          rounded-full flex items-center justify-center shadow-lg mb-4">
            <UserPlus size={36} />
          </div>

          <h2 className="text-3xl font-extrabold tracking-wide">إنشاء حساب جديد</h2>
          <p className="text-gray-300 mt-2">ابدأ تجربتك البنكية الذكية الآن ✨</p>

        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

   {/* Name */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="text-yellow-300" size={18} />
              <label className="text-sm text-gray-200">الاسم الكامل</label>
            </div>

            <input {...register("name")} placeholder="الاسم الكامل" className="w-full
            p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300
            focus:ring-2 focus:ring-purple-400 outline-none"/>

            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-yellow-300" size={18}/>
              <label className="text-sm text-gray-200">البريد الإلكتروني</label>
            </div>

<input {...register("email")} type="email" placeholder="example@email.com"
          className="w-full
          p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300
          focus:ring-2 focus:ring-purple-400 outline-none" />

          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="text-yellow-300" size={18} />
            <label className="text-sm text-gray-200">كلمة المرور</label>

         </div>

        <input {...register("password")} type="password" placeholder="••••••••"
        className="w-full
        p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300
        focus:ring-2 focus:ring-purple-400 outline-none"/>
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {/* ✅ تصحيح: bg-linear-to-r → bg-gradient-to-r */}
      <motion.button whileHover={{scale:1.05}} type="submit" disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500
      hover:to-yellow-400 text-white py-3 rounded-xl font-bold shadow-lg transition">
        {isSubmitting ? "...جاري التسجيل" : "تسجيل"}
      </motion.button>
    </form>

    {/* ✅ تصحيح: bg-linear-to-r → bg-gradient-to-r */}
    <motion.div initial={{width:0}} animate={{width:"100%"}}
    transition={{duration:1,delay:0.4}} className="h-0.5 bg-gradient-to-r
    from-yellow-400 via-pink-500 to-purple-600 mt-10 rounded-full "/>

      <div className="text-center mt-6 text-gray-300 text-sm">
        <p>© 2025 NeoBank - نظام مصرفي ذكي وآمن 💳</p>
      </div>
    </motion.div>

</div>
  )
};
export default Register