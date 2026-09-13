import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    CreditCard,
    Receipt,
    LogOut,
    Menu,
    X
} from "lucide-react";

export default function Header({ onLogout }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    const links = [
        {
            name: "الرئيسيه",
            icon: <LayoutDashboard size={18} />,
            path: "/"
        },
        {
            name: "المعاملات",
            icon: <Receipt size={18} />,
            path: "/Transactions"
        },
        {
            name: "المستخدمون",
            icon: <Users size={18} />,
            path: "/users"
        },
        {
            name: "البطاقات",
            icon: <CreditCard size={18} />,
            path: "/cards"
        }
    ];

    return (
        <header
            className="bg-linear-to-r from-[#0f1724]/40 via-[#2b1460]/30 to-[#4b2b7f]/35 backdrop-blur-md text-white shadow-lg fixed top-0 left-0 w-full z-50"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                <div className="text-xl sm:text-2xl font-bold tracking-wide">
                    <span className="text-yellow-300">
                        لوحه التحكم الإداريه
                    </span>
                </div>

                <nav className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                                location.pathname === link.path
                                    ? "bg-white/20 shadow-md"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            {link.icon}

                            <span className="text-sm font-medium">
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Desktop Logout */}
                <button
                    onClick={handleLogout}
                    className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg shadow"
                >
                    <LogOut size={18} />

                    <span className="font-medium text-sm">
                        تسجيل الخروج
                    </span>
                </button>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition"
                >
                    {menuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-linear-to-b from-indigo-800 text-white shadow-lg">

                    <nav className="flex flex-col gap-2 p-4">

                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                                    location.pathname === link.path
                                        ? "bg-white/20 shadow-md"
                                        : "hover:bg-white/10"
                                }`}
                            >
                                {link.icon}

                                <span className="text-sm font-medium">
                                    {link.name}
                                </span>
                            </Link>
                        ))}

                        {/* Mobile Logout */}
                        <button
                            onClick={() => {
                                setMenuOpen(false);
                                handleLogout();
                            }}
                            className="flex items-center gap-3 bg-red-500 hover:bg-red-600 transition px-3 py-3 rounded-lg mt-2"
                        >
                            <LogOut size={18} />

                            <span className="font-medium text-sm">
                                تسجيل الخروج
                            </span>
                        </button>

                    </nav>

                </div>
            )}

        </header>
    );
}