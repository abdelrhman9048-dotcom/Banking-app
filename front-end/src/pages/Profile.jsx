import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Wallet, CreditCard } from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

export default function Profile() {

    // المستخدم ودالة تحديث المستخدم وحالة التحميل من الـ Context
    const { user, setUser, loading } = useContext(AuthContext)

    const [card, setCard] = useState(null)
    const [flipped, setFlipped] = useState(false)

    // حالات التعديل
    const [editName, setEditName] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [saved, setSaved] = useState(false)


    // تحديث حقول التعديل لما بيانات المستخدم تتحمل
    useEffect(() => {
        if (user) {
            setEditName(user.name || "")
            setEditEmail(user.email || "")
        }
    }, [user])


    // جلب بيانات البطاقة من السيرفر
    useEffect(() => {

        const getCard = async () => {
            try {

                const token = localStorage.getItem("token")

                if (!token) return

                const { data } = await axios.get(
                    "http://localhost:4000/api/card",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setCard(data)

            } catch (err) {

                console.error(
                    "لم يتم العثور على بطاقة:",
                    err.response?.data || err.message
                )

                setCard(null)
            }
        }

        getCard()

    }, [])


    // تنسيق رقم البطاقة
    const formatCardNumber = (num) => {

        if (!num) {
            return "---- ---- ---- ----"
        }

        return num
            .replace(/\s?/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim()
    }


    // حساب الرصيد الكلي
    const totalBalance =
        (user?.balance || 0) +
        (card?.balance || 0)


    // حفظ التعديلات
    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const token = localStorage.getItem("token")

            const { data } = await axios.put(
                "http://localhost:4000/api/users/update",
                {
                    name: editName,
                    email: editEmail
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log("UPDATE SUCCESS:", data)


            // تحديث المستخدم في الـ Context
            setUser(data.user)


            // تحديث البيانات المخزنة
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            )


            // رسالة نجاح
            setSaved(true)

            setTimeout(() => {
                setSaved(false)
            }, 2000)

        } catch (err) {

            console.error(
                "UPDATE ERROR:",
                err.response?.data || err.message
            )

            alert(
                err.response?.data?.message ||
                "فشل حفظ التعديلات ❌"
            )
        }
    }


    // لا تعرض الصفحة قبل تحميل بيانات المستخدم
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0f1f] text-white">
                جاري تحميل بيانات الملف الشخصي...
            </div>
        )
    }


    return (

        <div className="pt-24 min-h-screen w-full bg-gradient-to-br from-[#0a0f1f] to-[#1a237e] flex flex-col items-center justify-center text-white relative overflow-hidden p-6">


            {/* خلفية متحركة */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.5,
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity
                }}
                className="absolute w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl top-[-200px] left-[-200px]"
            />


            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.4,
                    scale: [1, 1.3, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity
                }}
                className="absolute w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-3xl top-[-200px] right-[-200px]"
            />


            {/* العنوان */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.8
                }}
                className="text-center mb-12 z-10"
            >

                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-wide">
                    الملف الشخصي البنكي
                </h1>

                <p className="text-gray-400 text-sm md:text-base">
                    مرحباً {user?.name || "بك"} في نظام NeoBank
                </p>

            </motion.div>


            {/* البطاقة الائتمانية */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1
                }}
                className="relative perspective mb-10 z-10"
            >

                <motion.div

                    onClick={() =>
                        setFlipped((s) => !s)
                    }

                    animate={{
                        rotateY:
                            flipped ? 180 : 0
                    }}

                    transition={{
                        duration: 0.7
                    }}

                    style={{
                        transformStyle: "preserve-3d"
                    }}

                    className="cursor-pointer w-[320px] md:w-[400px] h-[220px] md:h-[260px]"
                >


                    {/* وجه البطاقة الأمامي */}

                    <div

                        className="absolute top-0 left-0 w-full h-full rounded-2xl p-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl flex flex-col justify-between"

                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(0deg)"
                        }}
                    >

                        <div className="flex justify-between items-start">

                            <div className="text-xs md:text-sm font-bold italic">
                                NeoBank • VISA
                            </div>

                            <div className="text-right text-xs">

                                <div className="text-white/70">
                                    صلاحية
                                </div>

                                <div className="font-semibold">
                                    {card?.expiryDate ?? "--/--"}
                                </div>

                            </div>

                        </div>


                        <div className="text-xl md:text-2xl font-mono tracking-widest mt-4">

                            {formatCardNumber(
                                card?.cardNumber
                            )}

                        </div>


                        <div className="mt-4 flex justify-between text-sm">

                            <div>

                                <div className="text-white/70 text-xs uppercase">
                                    المستخدم
                                </div>

                                <div className="font-semibold uppercase">
                                    {user?.name || "USER NAME"}
                                </div>

                            </div>


                            <div className="text-right">

                                <div className="text-white/70 text-xs uppercase">
                                    الرصيد
                                </div>

                                <div className="font-bold text-lg">

                                    $
                                    {card?.balance?.toFixed(2) ??
                                        "0.00"}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* وجه البطاقة الخلفي */}

                    <div

                        className="absolute top-0 left-0 w-full h-full rounded-2xl p-5 bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-2xl flex flex-col justify-between"

                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                        }}
                    >

                        <div className="w-full h-10 bg-black/80 mt-4 rounded-sm" />


                        <div className="px-2">

                            <div className="text-xs text-gray-300 mb-1 text-right">
                                CVV / رمز التحقق
                            </div>

                            <div className="bg-white text-black py-1 px-3 rounded-md w-max font-mono float-right">

                                {card?.cvv ?? "***"}

                            </div>

                        </div>


                        <div className="text-xs leading-relaxed text-gray-400 mt-4">

                            هذه البطاقة ملك لـ NeoBank.
                            استخدامها يخضع لشروط الخدمة.

                            <br />

                            لا تشارك معلومات البطاقة مع أي أحد. ⚠️

                        </div>

                    </div>

                </motion.div>

            </motion.div>


            {/* معلومات الحساب */}

            <motion.div

                initial={{
                    opacity: 0,
                    y: 40
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 1
                }}

                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-3xl z-10 mb-8"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">


                    {/* الاسم */}

                    <div className="flex items-center gap-3">

                        <User className="text-purple-400" />

                        <div>

                            <p className="text-sm text-gray-400">
                                الاسم الكامل
                            </p>

                            <p className="text-base font-semibold">
                                {user?.name || "غير متوفر"}
                            </p>

                        </div>

                    </div>


                    {/* البريد */}

                    <div className="flex items-center gap-3">

                        <Mail className="text-blue-400" />

                        <div>

                            <p className="text-sm text-gray-400">
                                البريد الإلكتروني
                            </p>

                            <p className="text-base font-semibold">
                                {user?.email || "غير متوفر"}
                            </p>

                        </div>

                    </div>


                    {/* الرصيد */}

                    <div className="flex items-center gap-3">

                        <Wallet className="text-yellow-400" />

                        <div>

                            <p className="text-sm text-gray-400">
                                الرصيد الكلي
                            </p>

                            <p className="text-lg font-bold text-yellow-300">

                                ${totalBalance.toFixed(2)}

                            </p>

                        </div>

                    </div>


                    {/* رقم البطاقة */}

                    <div className="flex items-center gap-3">

                        <CreditCard className="text-pink-400" />

                        <div>

                            <p className="text-sm text-gray-400">
                                رقم البطاقة
                            </p>

                            <p className="text-base font-semibold font-mono">

                                {card?.cardNumber
                                    ? `**** **** **** ${card.cardNumber.slice(-4)}`
                                    : "----"
                                }

                            </p>

                        </div>

                    </div>

                </div>

            </motion.div>


            {/* نموذج التعديل */}

            <motion.div

                initial={{
                    opacity: 0,
                    y: 40
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 1
                }}

                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-3xl text-gray-200 z-10"
            >

                <h3 className="text-lg font-bold mb-4 text-center text-white">
                    تعديل الملف الشخصي ✏️
                </h3>


                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >


                    {/* الاسم */}

                    <div>

                        <label className="text-sm text-gray-400">
                            الاسم
                        </label>

                        <input

                            type="text"

                            value={editName}

                            onChange={(e) =>
                                setEditName(
                                    e.target.value
                                )
                            }

                            className="w-full mt-1 rounded-lg bg-white/5 border border-white/20 text-white p-2 focus:outline-none focus:border-purple-500 transition"
                        />

                    </div>


                    {/* البريد */}

                    <div>

                        <label className="text-sm text-gray-400">
                            البريد الالكتروني
                        </label>

                        <input

                            type="email"

                            value={editEmail}

                            onChange={(e) =>
                                setEditEmail(
                                    e.target.value
                                )
                            }

                            className="w-full mt-1 rounded-lg bg-white/5 border border-white/20 text-white p-2 focus:outline-none focus:border-purple-500 transition"
                        />

                    </div>


                    {/* زر الحفظ */}

                    <button

                        type="submit"

                        className="mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition disabled:opacity-50"

                        disabled={saved}
                    >

                        {saved
                            ? "تم الحفظ ✅"
                            : "حفظ التعديلات"
                        }

                    </button>

                </form>

            </motion.div>


            <p className="mt-10 text-gray-400 text-sm z-10">
                © 2026 NeoBank. جميع الحقوق محفوظة.
            </p>


        </div>
    )
}