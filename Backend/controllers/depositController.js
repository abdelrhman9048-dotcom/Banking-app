import Stripe from "stripe"
import User from "../models/User.js"
import Transaction from "../models/Transaction.js"
import Notification from "../models/Notification.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createDepositSession =async(req,res)=>{
    const {amount} =req.body;
    const frontend_url ="http://localhost:5173";

try{
    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
     line_items:[
        {  price_data:{
            currency:"used",
            product_data:{name:"ايداع فى الحساب "},
            unit_amount:amount * 100,

        },quantity:1,},

        
     ],
     mode:"payment",
     success_url:`${frontend_url}/verify-deposit?success=true&amount=${amount}`,
     cancel_url:`${frontend_url}/verify-deposit?success=false` ,
    })
    res.json({success:true ,session_url:session.url})
}catch(err){
    console.log(err)
    res.json({success:false ,message:err.message})
}

 }

 export const verifyDeposit = async(req,res)=>{
    const{success,amount}=req.body
    const userId =req.user.id
    try{
        if(success === "true"){
            const depositAmount =Number(amount)
            const existingTransaction = await Transaction.findOne({
                user:userId,
                type:"deposit",
                amount:depositAmount,
            })
            if(existingTransaction){
                return res.json({
                    success:true,
                    message:"تم تسجيل العملية سابقا ",
                })
            }
            const user= await user.findById(userId)
            user.balance =(user.balance || 0 ) + depositAmount;
            await user.save()
            await Transaction.create({
                user:userId,
                type:"deposit",
                amount:depositAmount,
                receiver:user.email,
                date:new Date(),
            });
            await Notification.create({
                user:userId,
                title:"ايداع ناجح",
                message: `تم إيداع ${depositAmount}$ في حسابك باستخدام Stripe بنجاح`,

            });
            res.json({
                success:true,
                message:"تم الايداع بنجاح",
            });
        }else{
            res.json({
                success:false,
                message:"تم الغاء العملية",
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success:false , message:err.message})
    }
 }


