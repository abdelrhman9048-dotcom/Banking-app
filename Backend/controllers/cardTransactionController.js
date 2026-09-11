import Card from "../models/Card.js"
import User from "../models/User.js"
import Transaction from "../models/Transaction.js"
import Notification from "../models/Notification.js"

export const depositToCard = async(req,res)=>{
    const {amount} = req.body

    try{
        const card = await Card.findOne({user:req.user._id})
        if(!card) return res.status(404).json({message:"لم يتم العثور على بطاقة"})
        card.balance += Number(amount)
        await card.save()

        await Transaction.create({
            user:req.user._id,
            type:"deposit-card",
            amount,
            receiver:card.cardNumber,
        })
        await Notification.create({
            user:req.user._id,
            title: "عملية إيداع",
            message: `تم إيداع ${amount}$ في بطاقتك بنجاح`,
        })
        res.json({
            success: true,
            message: "تم الايداع فى البطاقة بنجاح",
            cardBalance: card.balance,
        });
    } catch(err) {
        console.error("Deposit Card Error",err)
        res.status(500).json({ success: false, message: err.message })
    }
};

export const withdrawFromCard = async (req, res) => {
    const { amount } = req.body;

    try {
        const card = await Card.findOne({ user: req.user._id })
        if (!card) return res.status(404).json({message:"لم يتم العثور على بطاقة"})
            if(card.balance < amount)
return res.status(400).json({message:"رصيد البطاقة غير كافى"})
        card.balance -= Number(amount)
        await card.save();

        await Transaction.create({
            user: req.user._id,
            type: "withdraw-card",
            amount,
            receiver: card.cardNumber,
        })

        await Notification.create({
            user: req.user._id,
            title: "عملية سحب",
            message: `تم سحب ${amount}$ من بطاقتك`,
        })
        res.json({
            success:true,
            message:"تم السحب من البطاقة بنجاح",
            cardBalance :card.balance,
        })
    }catch(err){
        console.error("Withdraw Error",err)
        res.status(500).json({success:false , message:err.message})
    }
}

export const getCardBalance = async(req,res)=>{
    try{
        const card = await Card.findOne({user:req.user._id})
        if(!card) return res.status(404).json({message:"لم يتم العثور على بطاقة"})
        res.json({balance:card.balance, cardNumber:card.cardNumber})
    }catch(err){
        console.error("Get Card Balance Error:",err)
        res.status(500).json({success:false , message:err.message})
    }
};

export const transferToCard = async(req,res)=>{
    const {amount} = req.body;
    try{
        const user = await User.findById(req.user._id)
        const card = await Card.findOne({user:req.user._id})
        if(!card) return res.status(404).json({message:"لم يتم العثور على بطاقة"})
        if(user.balance < amount) return res.status(400).json({message:"رصيد الحساب غير كافى"})
        user.balance -= Number(amount)
        card.balance += Number(amount)
        await user.save()
        await card.save()

        await Transaction.create({
            user:req.user._id,
            type:"transfer-to-card",
            amount,
            receiver:card.cardNumber,
        })

        await Notification.create({
            user:req.user._id,
            title: "تحويل داخلي",
            message: `تم تحويل ${amount}$ من حسابك إلى بطاقتك`,
        });

        res.json({
            success:true,
            message:"تم تحويل المبلغ الى البطاقة بنجاح",
            userBalance:user.balance,
            cardBalance : card.balance,
        
        })

    }catch(err){
        console.error("Transfer To Account Error:",err)
        res.status(500).json({success:false, message:err.message})
    }
} ;
export const transferToAccount = async(req, res)=>{
    const {amount} = req.body;
    try{
        const user = await User.findById(req.user._id)
        const card = await Card.findOne({user:req.user._id})
        if(!card) return res.status(404).json({message:"لم يتم العثور على بطاقة"})
        if(card.balance < amount) return res.status(400).json({message:"رصيد البطاقة غير كافى"})
        card.balance -= Number(amount)
        user.balance += Number(amount)
        await user.save()
        await card.save()

        await Transaction.create({
            user:req.user._id,
            type:"transfer-to-account",
            amount,
            receiver:user.email,
        })

        await Notification.create({
            user:req.user._id,
            title: "تحويل داخلي",
            message: `تم تحويل ${amount}$ من بطاقتك إلى الحساب الرئيسي`,
        })
        res.json({
            success:true,
            message:"تم تحويل المبلغ الى الحساب الرئيسى",
            userBalance : user.balance,
            cardBalance : card.balance,
        })

    }catch(err){
        console.error("Transfer To Account Error:",err)
        res.status(500).json({success:false, message:err.message})
    }
};