import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"

const generateToken = (id) =>
    jwt.sign({id,role:"admin"},process.env.JWT_SECRET,{expiresIn:"30d"})

export const registerAdmin = async(req,res)=>{
    const{name,email,password} = req.body



    const exists = await Admin.findOne({email})
    if(exists) return res.status(400).json({message:"المشرف موجود مسبقا"})
        const admin = await Admin.create({name,email,password})
res.json({
    _id:admin._id,
    name:admin.name,
    email:admin.email,
    token:generateToken(admin._id),
})
}

export const loginAdmin = async(req,res)=>{
    const{email,password} = req.body;
    const admin = await Admin.findOne({email});
    if(admin && (await admin.matchPassword(password))){
        res.json({
    _id:admin._id,
name:admin.name,
email:admin.email,
token: generateToken(admin._id),
});
}else{
    res.status(401).json({message:"بيانات الدخول غير صحيحة"});
}
};

