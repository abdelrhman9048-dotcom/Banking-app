import Transaction from "../models/Transaction.js";
  import User from "../models/User.js"

  export const deposit = async(req,res)=>{
    const{amount} = req.body;

    try{
        const user = await User.findById(req.user._id)
        user.balance += amount;
        await user.save()

        await Transaction.create({user:user._id ,type:"deposit",amount})
        res.json({message:"تم الايداع بنجاح"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
  }

  export const withdraw = async(req,res)=>{
    const{amount}=req.body;
    try{
const user = await User.findById(req.user._id)
if(user.balance < amount)
    return res.status(400).json({message:"رصيد غير كاف"})
user.balance -= amount
await user.save()
await Transaction.create({user:user._id ,type:"withdraw",amount});
    res.json({message:"تم السحب بنجاح ",balance:user.balance});
}catch(err){
        res.status(500).json({message:err.message});
    }
  };

  export const getTransactions = async(req,res)=>{
    try{
        const transactions = await Transaction.find({user:req.user._id}).sort({date:-1}) 
        res.json(transactions);
    }catch(err){
        res.status(500).json({message:err.message});
    }
  };