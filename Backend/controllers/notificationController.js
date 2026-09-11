import Notification from "../models/Notification.js"

export const getNotifications = async(req,res)=>{
    try{
        const notifications =await Notification.find({user:req.user._id}).sort({createdAt:-1});
        res.json(notifications)
    }catch(err){
        res.status(500).json({Message:"فشل فى جلب الاشعارات "})
    }

}

export const markAsRead = async(req,res)=>{
 try{
    await Notification.findByIdAndupdate(req.params.id, {read:true})
        res.json({success:true})
    }catch(err){
        res.status(500).json({Message:"فشل فى تحديث الاشعار"});
    }


}