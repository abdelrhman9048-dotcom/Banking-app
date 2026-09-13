import Stripe from "stripe"
import User from "../Model/User.js"
import Transaction from "../Model/Transaction.js"
import Notification from "../Model/Notifications.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// إنشاء جلسة الدفع
export const createDepositSession = async (req, res) => {
    const { amount } = req.body

    const frontend_url = "http://localhost:5174"

    try {

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "أدخل مبلغ صحيح"
            })
        }

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {

                        // العملة الصحيحة
                        currency: "usd",

                        product_data: {
                            name: "إيداع في الحساب"
                        },

                        // Stripe يتعامل بالسنت
                        unit_amount: Math.round(Number(amount) * 100)

                    },

                    quantity: 1
                }
            ],

            mode: "payment",

            success_url:
                `${frontend_url}/verify-deposit?success=true&amount=${amount}`,

            cancel_url:
                `${frontend_url}/verify-deposit?success=false`
        })


        res.json({
            success: true,
            session_url: session.url
        })

    } catch (err) {

        console.log("STRIPE ERROR:", err)

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// التحقق من الإيداع
export const verifyDeposit = async (req, res) => {

    const { success, amount } = req.body

    const userId = req.user.id

    try {

        if (success === "true") {

            const depositAmount = Number(amount)


            if (!depositAmount || depositAmount <= 0) {

                return res.status(400).json({
                    success: false,
                    message: "مبلغ الإيداع غير صحيح"
                })

            }


            // البحث عن عملية سابقة لمنع تكرار الإيداع
            const existingTransaction =
                await Transaction.findOne({

                    user: userId,

                    type: "deposit",

                    amount: depositAmount

                })


            if (existingTransaction) {

                return res.json({

                    success: true,

                    alreadyProcessed: true,

                    message: "تم تسجيل العملية سابقاً"

                })

            }


            // هنا كان الخطأ عندك
            // user.findById ❌
            // User.findById ✅

            const user =
                await User.findById(userId)


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message: "المستخدم غير موجود"

                })

            }


            // تحديث رصيد الحساب
            user.balance =
                (user.balance || 0) + depositAmount


            await user.save()


            // تسجيل العملية
            await Transaction.create({

                user: userId,

                type: "deposit",

                amount: depositAmount,

                receiver: user.email,

                date: new Date()

            })


            // إنشاء Notification
            await Notification.create({

                user: userId,

                title: "إيداع ناجح",

                message:
                    `تم إيداع ${depositAmount}$ في حسابك باستخدام Stripe بنجاح`

            })


            return res.json({

                success: true,

                message: "تم الإيداع بنجاح",

                newBalance: user.balance

            })

        } else {

            return res.json({

                success: false,

                message: "تم إلغاء العملية"

            })

        }

    } catch (err) {

        console.log("VERIFY DEPOSIT ERROR:", err)

        res.status(500).json({

            success: false,

            message: err.message

        })

    }

}