import { useEffect, useState, useContext } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

export default function VerifyDeposit() {
  const [status, setStatus] = useState("loading")
  const [params] = useSearchParams()
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyDeposit = async () => {

      const success = params.get("success")
      const amount = params.get("amount")
      const token = localStorage.getItem("token")

      try {

        const { data } = await axios.post(
          "/api/deposit/verify",
          {
            success,
            amount
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (data.success) {

          setUser((prev) => ({
            ...prev,
            balance: data.newBalance ?? prev.balance
          }))

          setStatus("success")

        } else {

          setStatus("error")

        }

      } catch (err) {

        console.error(err)
        setStatus("error")

      } finally {

        setTimeout(() => navigate("/"), 2000)

      }
    }

    verifyDeposit()

  }, [params, navigate, setUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white px-6">

      <div className="text-center flex flex-col items-center">

        {status === "loading" && (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 className="w-20 h-20 animate-spin text-cyan-400 mb-6" />

            <h2 className="text-2xl font-semibold">
              جاري التحقق من عملية الدفع...
            </h2>

            <p className="text-gray-300 mt-2">
              يرجى الانتظار قليلاً
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">

            <CheckCircle className="w-24 h-24 text-green-400 mb-6 animate-bounce" />

            <h2 className="text-3xl font-bold">
              تم الإيداع بنجاح 🎉
            </h2>

            <p className="text-gray-300 mt-2">
              سيتم نقلك إلى صفحتك الرئيسية الآن...
            </p>

          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">

            <XCircle className="w-24 h-24 text-red-400 mb-6 animate-bounce" />

            <h2 className="text-3xl font-bold">
              فشلت عملية الدفع
            </h2>

            <p className="text-gray-300 mt-2">
              حدث خطأ أثناء التحقق، سيتم إعادتك للصفحة الرئيسية...
            </p>

          </div>
        )}

      </div>

    </div>
  )
}