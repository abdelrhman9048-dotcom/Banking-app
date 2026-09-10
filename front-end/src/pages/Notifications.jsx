import { useEffect, useState } from "react";
import { Bell, CheckCircle, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { title, ul } from "framer-motion/client";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const demoData = [
            {
                _id: "1",
                title: "تمت عملية شراء جديدة 💳",
                message: "قام المستخدم خالد بشراء منتج بقيمة 120$",
                createdAt: new Date().toISOString(),
                read: false,
            },
            {
                _id: "2",
                title: "تذكير بتديد الإشتراك ⏲️",
                message: "ينتهي إشتراكك خلال 3 أيام، سارع بالتجديد!",
                createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
                read: true,
            },
        ];
        setTimeout(() => setNotifications(demoData), 1200);
    }, []);

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
    }



    return (
        <div className="pt-30 relative min-h-screen flex items-center
        justify-center overflow-hidden p-6 text-white bg-[#0b0014]">
            <div className="absolute inset-0 bg-linear-to-br from-[#1a0033] via-[#4a0080]
            to-[#9d00ff] animate-gradient"/>
            <div className="absolute w-[600px] h-[600px] bg-purple-600/30 blur-[120px]
            rounded-full top-1/4 left-1/2 -translate-x-1/2 animate-pulse"/>

            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }} className="relative z-10
            w-full max-w-3xl bg-white/20 backdrop-blur-2xl border
            border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-3xl p-8">

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }} className="text-center mb-8">

                    <motion.div animate={{ rotate: [0, 15, -15.0] }} transition={{ repeat: Infinity, duration: 4 }}
                        className="inline-block">
                        <Bell size={58} className="text-yellow-400 drop-shadow-lg " />

                    </motion.div>

                    <h2 className="text-4xl font-extrabold mt-4 tracking-wide">الإشعارات</h2>
                    <p className="text-gray-300 mt-2">كل العمليات والتنبيهات الحديثة ✨</p>

                </motion.div>

                <div className="relative max-h-[500px] overflow-y-auto pr-2 custom-scroll">
                    <AnimatePresence>
                        {notifications.length === 0 ? (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-center text-gray-400 text-lg">

                                لا توجد إشعارات حاليا 📭

                            </motion.p>
                        ) : (
                            <ul className="space-y-4">
                                {notifications.map((n, i) => (
                                    <motion.li key={n._id} initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                        className={`relative overflow-hidden group p-5 rounded-2xl border
                                    backdrop-blur-md transition-all duration-300 flex items-center justify-between
                                    shadow-md hover:scale-[1.02] hover:shadow-purple-500/20
                                    ${n.read
                                                ? "bg-white/5 border-white/20 text-gray-400"
                                                : "bg-linear-to-r from-purple-600/30 to-pink-600/20 border-purple-400/30"
                                            }`}>

                                        <span className="absolute left-0 top-0 w-[3px] h-full bg-linear-to-b
                                        from-yellow-400 via-pink-500 to-purple-600 opacity-0
                                        group-hover:opacity-100 transition-opacity duration-300"/>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-1">{n.title}</h3>
                                            <p className="text-sm text-gray-300">{n.message}</p>
                                            <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                                <Clock size={14} />
                                                {new Date(n.createdAt).toLocaleString("ar-SA")}

                                            </div>
                                        </div>

                                        {!n.read && (
                                            <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}
                                                onClick={() => markAsRead(n._id)} className="bg-green-500/80 hover:bg-green-600/90
                                            px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-md
                                            ">
                                                <CheckCircle size={18} /> تم

                                            </motion.button>
                                        )}




                                    </motion.li>
                                ))}

                            </ul>
                        )}
                    </AnimatePresence>

                </div>

            </motion.div>

            <style jsx>{`
                .custom-scroll::-webkit-scrollbar {
                   width: 8px;
                }

                .custom-scroll::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #a855f7, #ec4899);
                  border-radius: 8px;
                }

                .custom-scroll::-webkit-scrollbar-thumb:hover {
                   background: linear-gradient(180deg, #c084fc, #f472b6);
                }

                .custom-scroll::-webkit-scrollbar-track {
                   background: transparent;
                }
           `}</style>

        </div>


    )
};
