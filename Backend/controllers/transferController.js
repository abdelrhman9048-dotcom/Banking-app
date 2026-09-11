import Transaction from "../Model/Transaction.js"
import User from "../Model/User.js"
import Notification from "../Model/Notifications.js"

export const transfer = async(req,res)=>{
    const{receiverEmail ,amount} = req.body

    try{
        const sender = await User.findById(req.user._id)
        const receiver =await User.findOne({email:receiverEmail});
 if(!receiver) return res.status(404).json({message:"المستلم غير موجود "})       
 if(sender.balance < amount)return res.status(400).json({message:"رصيد غير كاف"}) 

    sender.balance -= Number(amount)
    receiver.balance +=Number(amount)

    await sender.save()
    await receiver.save()


    await Transaction.create({
        user:sender._id,
        type:"transfer",
        amount,
        receiver:receiver.email,
    })

await Notification.create({
   user:receiver._id,
   title:"حوالة واردة ",
message:` وصلك تحويل بقيمة ${amount}$ من ${sender.name || sender.email} `,


})
await Notification.create({
    user:sender._id,
    title:"حوالة ناجحة",
    message:`تم ارسال${amount}$ الى${receiver.name || receiver.email}`,

})
res.json({success:true ,message:"تم ارسال الاموال بنجاح"});
   }catch(err){

    console.error("Transfer Error:",err);
    res.status(500).json({success:false,message:err.message});
   }
}
