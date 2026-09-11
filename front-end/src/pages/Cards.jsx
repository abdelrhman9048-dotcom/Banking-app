import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, RefreshCw, Plus } from "lucide-react"
import axios from "axios"

const MyCard = () => {
    const [card, setCard] = useState(null)
    const [flipped, setFlipped] = useState(false)
    const [msg, setMsg] = useState("")

    const user =
        typeof window !== "undefined" && localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null


    // جلب البطاقة
    const getCard = async () => {
        try {
            const token = localStorage.getItem("token")

            const { data } = await axios.get(
                "http://localhost:4000/api/card",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setCard(data)
            setMsg("")

        } catch (err) {
            console.error(
                "GET CARD ERROR:",
                err.response?.data || err.message
            )

            setCard(null)

            if (err.response?.status === 404) {
                setMsg("لم يتم العثور على بطاقة نشطة")
            } else {
                setMsg("حدث خطأ أثناء تحميل البطاقة ❌")
            }
        }
    }


    // إنشاء بطاقة جديدة
    const createCard = async () => {
        try {
            const token = localStorage.getItem("token")

            const { data } = await axios.post(
                "http://localhost:4000/api/card",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setCard(data)
            setMsg("تم إنشاء البطاقة بنجاح ✅")

        } catch (err) {
            console.error(
                "CREATE CARD ERROR:",
                err.response?.data || err.message
            )

            setMsg(
                err.response?.data?.message ||
                "فشل إنشاء البطاقة ❌"
            )
        }
    }


    // جلب البطاقة عند فتح الصفحة
    useEffect(() => {
        getCard()
    }, [])


    // تنسيق رقم البطاقة
    const formatCardNumber = (num) => {
        if (!num) return "**** **** **** ****"

        return num
            .replace(/(\d{4})/g, "$1 ")
            .trim()
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#0a0f1f] via-[#1a237e] to-[#3f51b5] relative overflow-hidden p-6">

            <div className="w-full max-w-xl mt-10">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                        <CreditCard />
                        بطاقتي الافتراضية
                    </h2>


                    <div className="flex gap-2">

                        <button
                            onClick={getCard}
                            className="flex items-center bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-md gap-2 transition"
                        >
                            <RefreshCw size={16} />
                            تحديث
                        </button>


                        <button
                            onClick={createCard}
                            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-md font-bold transition"
                        >
                            <Plus size={16} />
                            إنشاء
                        </button>

                    </div>

                </div>


                {/* الرسائل */}

                {msg && (
                    <div
                        className={`mb-4 text-center p-2 rounded-lg ${
                            msg.includes("✅")
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                        }`}
                    >
                        {msg}
                    </div>
                )}


                {/* البطاقة */}

                <div className="relative perspective-distant w-full h-64">

                    <motion.div
                        onClick={() => setFlipped((s) => !s)}
                        animate={{
                            rotateY: flipped ? 180 : 0,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                        className="cursor-pointer select-none w-full h-full relative"
                    >


                        {/* الوجه الأمامي */}

                        <div
                            className="absolute w-full h-full rounded-2xl p-6 text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-2xl flex flex-col justify-between"
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(0deg)",
                            }}
                        >

                            <div className="flex justify-between items-start">

                                <svg
                                    width="40"
                                    height="30"
                                    viewBox="0 0 48 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="10"
                                        fill="white"
                                        opacity="0.9"
                                    />

                                    <circle
                                        cx="32"
                                        cy="16"
                                        r="10"
                                        fill="white"
                                        opacity="0.6"
                                    />
                                </svg>


                                <div className="text-sm font-bold italic">
                                    NeoBank • VISA
                                </div>

                            </div>


                            <div className="text-2xl font-mono tracking-widest mt-4">

                                {formatCardNumber(
                                    card?.cardNumber
                                )}

                            </div>


                            <div className="flex justify-between items-end mt-4">

                                <div className="text-sm">

                                    <div className="text-white/70 text-xs uppercase">
                                        Card Holder
                                    </div>

                                    <div className="font-semibold uppercase">

                                        {user?.name ??
                                            "USER NAME"}

                                    </div>

                                </div>


                                <div className="text-sm text-right">

                                    <div className="text-white/70 text-xs uppercase">
                                        Expires
                                    </div>

                                    <div className="font-semibold">

                                        {card?.expiryDate ??
                                            "MM/YY"}

                                    </div>

                                </div>

                            </div>


                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />

                        </div>


                        {/* الوجه الخلفي */}

                        <div
                            className="absolute w-full h-full rounded-2xl p-6 bg-gradient-to-r from-gray-700 to-gray-900 shadow-2xl text-white flex flex-col justify-between"
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                            }}
                        >

                            <div className="w-full h-12 bg-black/80 mt-4 rounded-sm" />


                            <div className="px-2">

                                <div className="text-xs text-gray-300 mb-1 text-right">
                                    CVV / رمز التحقق
                                </div>


                                <div className="bg-white text-black p-2 rounded w-max font-mono tracking-widest float-right">

                                    {card?.cvv ?? "***"}

                                </div>

                            </div>


                            <div className="mt-8 text-xs text-gray-400 leading-relaxed">

                                <p>
                                    هذه البطاقة ملك لـ NeoBank.
                                    استخدامها يخضع لشروط الخدمة.
                                </p>

                                <p>
                                    في حال الضياع يرجى الاتصال فوراً بالدعم الفني.
                                </p>

                            </div>

                        </div>

                    </motion.div>

                </div>


                <div className="mt-8 text-center text-sm text-white/60">
                    اضغط على البطاقة لقلبها وعرض رمز CVV
                </div>

            </div>

        </div>
    )
}

export default MyCard