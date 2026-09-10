import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, RefreshCw, Plus } from "lucide-react";

const MyCard = () => {

    const [user, setUser] = useState({
        name:"أحمد محمد",
        email: "ahmed@example.com",
    });
    const [card, setCard] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [msg, setMsg] = useState("");

    
    const formatCardNumber = (num) => {
        if (!num) return "---- ---- ---- ----";
        const s = String(num).replace(/\D/g, "");
        return s.replace(/(\d{4})(?=\d)/g, "$1 ");
    };

    const randomForm = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    
    const genCardNumber  = () =>
        Array.from({ length: 16}, () => randomForm(0, 9)).join("");

    const genCVV = () => String(randomForm(100, 999));
    const genExpiry = () => {
    const mon = String(randomForm (1, 12)).padStart(2, "0");
    const year = String(new Date().getFullYear() + randomForm(1, 5)).slice(-2);

    return `${mon}/${year}`;
};

useEffect(() => {
    const stored = localStorage.getItem("mycard_data_v1");

    if (stored) {
        try {
        const parsed = JSON.parse(stored);

        if (parsed.user) setUser(parsed.user);
        if (parsed.card) setCard(parsed.card);
        } catch (e) {
        console.warn("parsing localStorage failed", e);
        }
    } else {
        const initial = {
        cardNumber: genCardNumber (),
        expiryDate: genExpiry(),
        cvv: genCVV(),
        balance: Number((randomForm(0, 5000) + Math.random()).toFixed(2)),
    };
    setCard(initial);

    localStorage.setItem(
    "mycard_data_v1",
    JSON.stringify({ user, card: initial })
    );
    }
}, []);

useEffect(() => {
    const payload = { user, card };

    try {
        localStorage.setItem("mycard_data_v1", JSON.stringify(payload));
    } catch (e) {
        console.warn("saving localStorage failed", e);
    }
}, [user, card]);

const getCard = () => {
    setMsg("جاري تحديث البطاقة...");

    setTimeout(() => {
        const updated = {
        ...card,
        balance: Number(
            (randomForm(0, 5000) + Math.random()).toFixed(2)
        ),
        };

        setCard(updated);
        setMsg("تم تحديث رصيد البطاقة");

        setTimeout(() => setMsg(""), 2000);
    }, 600);
};

const createCard = () => {
    const newCard = {
        cardNumber: genCardNumber (),
        expiryDate: genExpiry(),
        cvv: genCVV(),
        balance: Number((randomForm(0, 2000) + Math.random()).toFixed(2)),
    };
    setCard(newCard);
    setMsg("تم إنشاء بطاقة جديدة");
    setTimeout(() => setMsg(""), 2000);
};

    return (
        <div className="min-h-screen 
        flex flex-col items-center justify-between bg-linear-to-br 
        from-[#0a0f1f] via-[#1a237e] to-[#3f51b5] relative overflow-hidden">
            <div className="w-full max-w-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                        <CreditCard/> بطاقتي الافتراضية
                    </h2>

                    <div className="flex gap-2">
                        <button onClick={getCard} className="flex items-center bg-white/10 
                            hover:bg-white/20 text-white px-3 py-2 rounded-md gap-2" title="تحديث">
                                <RefreshCw size={16}/> تحديث

                        </button>
                        <button onClick={createCard} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-md" title="إنشاء بطاقة">
                            <Plus size={16}/> إنشاء

                        </button>


                    </div>

                </div>

                <div className="relative perspective-distant">
                    <motion.div onClick={() => setFlipped((s) => !s)} animate={{ rotateY: flipped ? 180 : 0 }} transition={{duration:0.7}} style={{ transformStyle: "preserve-3d" }} 
                    className="cursor-pointer select-none">
                        <div className="relative rounded-2xl p-6 text-white h-64 bg-linear-to-r from-indigo-600 
                        via-purple-600 to-pink-500 shadow-2xl" style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}>
                            <div className="flex justify-between items-start h-12">
                                <div className="flex items-center gap-3">
                                    <svg width="26" height="18" viewBox="0 0 48 32" fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="16" cy="16" r="8" fill="white" opacity="0.9"/>
                                        <circle cx="32" cy="16" r="8" fill="white" opacity="0.6"/>
                                    </svg>

                                </div>

                                <div className="text-sm text-white/90">NeoBank • VISA</div>

                            </div>
                            <div className="text-right text-xs">
                                <div className="text-white/80">صلاحية</div>
                                <div className="font-semibold">{card?.expiryDate ?? "--/--"}</div>

                            </div>

                        </div>

                        <div className="mt-6 ">
                            <div className="text-2xl font-mono tracking-widest">
                                {formatCardNumber(card?.cardNumber)}
                            </div>

                        </div>
                        <div className="mt-6 flex justify-between items-end">
                            <div className="text-sm">
                                <div className="text-white/80">المستخدم</div>
                                <div className="font-semibold">{user?.name ?? user?.email ?? "مستخدم"}</div>

                            </div>
                            <div className="text-sm text-right">
                                <div className="text-white/80">رصيد البطاقة</div>
                                <div className="font-bold text-lg">${card?.balance ?.toFixed(2) ?? "0.00"}</div>

                            </div>

                        </div>

                        <div className="absolute bottom-8 left-12 w-40 h-40 bg-white/5 rounded-full blur-3xl"/>
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"/>

                        {/* Back */}

                        <div className="absolute top-0 left-0 w-full rounded-2xl p-6 text-black h-64 bg-linear-to-r 
                        from-gray-200 to-gray-300 shadow-2xl" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>

                            <div className="h-10 bg-black/85 rounded-sm"/>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="w-2/3">
                                <div className="text-xs text-gray-700 mb-1">CVV / رمز التحقق</div>
                                <div className= "bg-white p-2 rounded-md w-max font-mono tracking-widest">{card?.cvv ?? "*"}</div>
                        

                            </div>
                            <div className="text-right text-xs">
                                <div className="mt-6 text-sm text-gray-600">انتهت الصلاحية</div>
                                <div className="font-semibold">{card?.expiryDate ?? "--/--"}</div>

                            </div>
                            
                        </div>

                        <div className="mt-6 text-sm text-gray-600">
                            <div className="mb-2 font-medium">ملاحظات الأمان</div>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>لا تشاركرقم البطاقة أو CVV مع أحد.</li>
                                <li>استخدم البطاقة للتجارب فقط.</li>
                            </ul>

                        </div>

                        <div className="absolute bottom-0 right-4 text-xs text-gray-500">NeoBank • 2026</div>

                        </div>
                        

                    </motion.div>
                        
                        {msg && (
                            <div className="mt-4 text-center text-sm text-green-300">{msg}</div>
                        )}

                        <div className="mt-4 text-sm text-white/80">
                            اضغط علي البطاقة لقلبها و عرض التفاصيل
                        </div>

                </div>

            </div>

        </div>
    )
};
export default MyCard ;

