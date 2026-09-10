import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useContext(AdminAuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(name, email, password);
            navigate('/')
        } catch (err) {
            alert(err.response?.data?.message || "خطأ اثناء التسجيل")
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br
          from-indigo-600 to-purple-700 text-white
          ">
            <form onSubmit={handleSubmit} className="bg-white/10 p-10 rounded-2xl 
            shadow-2xl backdrop-blur-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">تسجيل مشرف جديد</h2>

                <input
                    value={name}
                    placeholder="الإسم الكامل"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-3 rounded bg-white/20 text-white placeholder-gray-300"
                    required
                />

                <input
                    value={email}
                    placeholder="البريد الإلكتروني"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full mb-4 p-3 rounded bg-white/20 text-white placeholder-gray-300"
                    required
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة المرور"
                    type="password"
                    className="w-full mb-4 p-3 rounded bg-white/20 text-white placeholder-gray-300"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-yellow-400 text-black py-3 rounded font-bold transition" > تسجيل </button>

                <p className="text-sm text-white/80 mt-4 text-center">
                    لديك حساب؟ <Link to="/login" className="underline">تسجيل الدخول</Link>
                </p>
            </form>
        </div>
    );
}
