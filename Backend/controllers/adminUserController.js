import User from "../Model/User.js";
export const getAllUsers = async(req, res)=>{
    const users = await User.find().select("-password");
    res.json(users);

};


export const deleteUser = async(req,res)=>{
      await User.findByIdAndDelete(req.params.id);
    res.json({messages:"تم حذف المستخدم بنجاح"})

};

export const updateUserBalance= async(req,res)=>{
    const{id}=req.params;
    const {balance}=req.body;
    const user = await User.findById(id);
    if(!user)return res.status(404).json({message:"المستخدم غير موجود"});
        user.balance = balance;
    await user.save();
    res.json({message:"تم تحديث الرصيد ",balance:user.balance});
};

