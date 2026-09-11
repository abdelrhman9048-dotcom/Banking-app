import { useContext, useState } from "react" //  إضافة useContext
import { useLocation, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Menu, X } from "lucide-react" //  استبدال HiMenu/HiX بأيقونات lucide
import { AuthContext } from "../context/AuthContext"

export default function Header() {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    //   ربط الهيدر بالـ Context
    const { user, logout } = useContext(AuthContext)

    //  تصحيح المسارات لتكون Small Letters زي الـ Router
    const navlinks = [
        { path: "/", label: "الرئيسية" },
        { path: "/transactions", label: "المعاملات" },
        { path: "/transfer", label: "التحويل" },
        { path: "/profile", label: "الملف الشخصي" },
        { path: "/mycard", label: "بطاقتي" },
    ]

    return (
        <motion.div 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">
                {/* الشعار */}
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl shadow-md">
                        <span className="text-2xl">🏦</span>
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-wide">
                        <span className="text-yellow-400">Neo</span>Bank
                    </h1>
                </div>

                {/* روابط الديسكتوب */}
                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <>
                            {navlinks.map((link) => (
                                <Link 
                                    key={link.path} 
                                    to={link.path} 
                                    className={`relative text-sm font-medium transition-all duration-300 hover:text-yellow-300 ${
                                        location.pathname === link.path ? "text-yellow-400" : "text-gray-200"
                                    }`}
                                >
                                    {link.label}
                                    {location.pathname === link.path && (
                                        <motion.span 
                                            layoutId="underline" 
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500"
                                        />
                                    )}
                                </Link>
                            ))}

                            {/* أيقونة الإشعارات */}
                            <Link to="/notifications" className="relative group">
                                <motion.div 
                                    whileHover={{ scale: 1.15, rotate: 10 }} 
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all relative"
                                >
                                    <Bell size={22} className="text-yellow-300" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                </motion.div>
                            </Link>

                            <button 
                                onClick={logout} 
                                className="ml-4 bg-gradient-to-r from-red-500 to-red-600 px-4 py-1.5 rounded-lg hover:shadow-red-500/30 transition-all"
                            >
                                تسجيل الخروج
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-200 hover:text-yellow-300 transition-all">
                                تسجيل الدخول
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                إنشاء حساب
                            </Link>
                        </>
                    )}
                </div>

                {/* أيقونة القائمة للموبايل */}
                <div className="md:hidden flex items-center gap-3">
                    {user && (
                        <Link to="/notifications" className="relative">
                            <motion.div 
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all relative"
                            >
                                <Bell size={22} className="text-yellow-300" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            </motion.div>
                        </Link>
                    )}
                    <button 
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {/* ✅ استخدام أيقونات Lucide الصحيحة */}
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* قائمة الجوال */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} 
                        transition={{ duration: 0.3 }} 
                        className="md:hidden bg-slate-900/90 backdrop-blur-xl border-t border-white/20 overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-4 gap-3 text-white">
                            {user ? (
                                <>
                                    {navlinks.map((link) => (
                                        <Link 
                                            key={link.path} 
                                            to={link.path} 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-sm font-medium transition-all duration-300 hover:text-yellow-300 ${
                                                location.pathname === link.path ? "text-yellow-400" : "text-gray-200"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <button 
                                        onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                                        className="mt-2 bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg text-center"
                                    >
                                        تسجيل الخروج
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 hover:text-yellow-300">
                                        تسجيل الدخول
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-full text-center">
                                        إنشاء حساب
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}