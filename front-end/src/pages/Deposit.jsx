import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

const Deposit = () => {
    const { user } = useContext(AuthContext)
    const [amount, setAmount] = useState("")

    const handleDeposit = async () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("يرجى إدخال مبلغ صحيح 💳")
            return
        }

        try {
            const token = localStorage.getItem("token")
            const { data } = await axios.post(
                "/deposit/create", 
                { amount }, 
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success && data.session_url) {
                window.location.href = data.session_url
            } else {
                alert("حدث خطأ أثناء إنشاء الجلسة ❌")
            }
        } catch (err) {
            console.error(err)
            alert("فشل الاتصال بـ Stripe أو السيرفر ⚠️")
        }
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm mx-auto mt-10 text-center">
            <h2 className="text-xl font-bold mb-4">💰 إيداع رصيد</h2>

            <input
                type="number"
                placeholder="أدخل المبلغ بالدولار"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded-md p-2 w-full text-center mb-4"
            />

            <button
                onClick={handleDeposit}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
            >
                متابعة الدفع عبر Stripe
            </button>
        </div>
    )
}

export default Deposit