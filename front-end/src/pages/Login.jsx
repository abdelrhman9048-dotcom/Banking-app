import { useState, useContex } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";


const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {login} = useContex(AdminAuthContext);

    const navegate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            await login(email,password)
            navegate('/')
        }catch(err){
            alert("بيانات الدخول غير صحيحة")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br
          from-indigo-600 to-purple-700 text-white
          ">
            <form onSubmit={handleSubmit} className="bg-white/10 p-10 rounded-2xl shadow-2xl backdrop-blur-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">لوحة المشرف</h2>
                <input 
                type="email" 
                placeholder="البريد الإلكتروني"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-3 rounded bg-white/20 text-white placeholder-gray-300"
                />

                <input type="password"
                placeholder="كلمة المرور" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-3 rounded bg-white/20 text-white placeholder-gray-300" 
                />

                <button 
                   type="submit" 
                   className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded font-bold transition"
                >
                    تسجيل الدخول
                </button>

            </form>


        </div>
    )
};
export default Login;

