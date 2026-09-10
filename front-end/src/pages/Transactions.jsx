import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, Clock } from "lucide-react"

export default function Trasactions () {
    const [transactions, setTransactions] = useState([]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#3a0078] to-[#1a237e] p-6">
            <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} 
            transition={{duration:1}} className="w-full max-w-3xl mt-20 bg-white/10 backdrop-blur-2xl border 
            border-white/20 rounded-3xl p-8 shadow-2xl text-white">

                <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}}
                transition={{duration:0.8}} className="text-center mb-10">

                    <div className="w-20 h-20 mx-auto bg-linear-to-r from-purple-400 tp -pink-500 rounded-full 
                    flex items-center justify-center shadow-lg">
                        <Clock size={36}/>

                    </div>
                    <h2 className="text-3xl font-extrabold mt-4">تاريخ المعاملات</h2>
                    <p className="text-gray-300 mt-2 text-sm">
                        عرض تفصيلي و آمن لجميع عملياتك البنكية الأخيرة 🔒
                    </p>

                </motion.div>
                {/* Transactions Table */}

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                <table className="min-w-full text-center text-gray-200">
                    <thead>
                        <tr className="bg-white text-white text-lg font-semibold">
                            <th className="py-4 ">النوع</th>
                            <th className="py-4 ">المبلغ</th>
                            <th className="py-4 ">التاريخ</th>
                        </tr>
                    </thead>

                </table>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((t, i)=>(
                            <motion.tr key={t._id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                            transition={{delay:i * 0.05}} className="border-t border-white/10 hover:bg-white/10 
                            transition">
                                <td className="py-4 flex items-center gap-2">
                                    {
                                        t.type === "deposit" ? (
                                            <ArrowDownCircle className="text-green-400"/>
                                        ):(
                                            <ArrowUpCircle className="text-red-400"/>
                                        )
                                    }
                                    <span>
                                        {t.type === "deposit" ? "إيداع" : "سحب / تحويل"}
                                    </span>

                                </td>
                                <td className={`py-4 font-semibold ${t.type === "deposit" ? "text-green-400" 
                                :"text-red-400"}`}>
                                    ${t.amount}

                                </td>
                                <td className="py-4 text-gray-300">
                                    {new Date(t.date).toLocalDateString("ar-SA")}

                                </td>

                            </motion.tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan={"3"} className="py-8 text-gray-400 text-lg">
                                لا توجد معاملات حاليا 💳

                            </td>
                        </tr>
                    )}
                </tbody>

                </div>

                <div className="text-center mt-8 text-gray-300 text-sm">
                    <p>© 2026 NeoBank _ معاملاتك بأمان تام 🔒</p>

                </div>

            </motion.div>

        </div>
    )
};
