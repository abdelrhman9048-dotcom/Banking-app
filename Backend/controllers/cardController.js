import Card from "../models/Card.js"
import User from "../models/User.js"

function generateCardNumber(){
    const prefix = "4000";//بداية بطاقة الفيزا
    const randomPart = Math.floor(Math.random()*1e12).toString().padStart(12,"0")
    return prefix + randomPart
}

function generatecvv(){
    return Math.floor(100 + Math.random()*900).toString()
}

function generateExpiry(){
    const date = new Date()
    const month =String(date.getMonth()+ 1).padStart(2,"0");
    const year = (date.getFullYear() +  3).toString().slice(2)//سنوات صلاحية 3
    return `${month}/${year}`;
}


export const createCard = async(req,res)=>{
    try{
        const existing = await Card.findOne({user:req.user._id})
        if(existing) return res.status(400).json({message:"تم انشاء البطاقة مسبقا "})
            const card = await Card.create({
        user:req.user._id,
        cardNumber:generateCardNumber(),
        cvv:generateCVV(),
        expiryDate:generateExpiry(),
            });
            res.json(card);

        }catch(err){
            console.log(err)
            res.status(500).json({message:err.message})
        }
    }

     export const getMyCard = async(req,res)=>{
        try{
            const card = await Card.findOne({user:req.user._id})
            if(!card) return res.status(404).json({message:"لم يتم العثور على بطاقة "})
                res.json(card);
        }catch(err){
            console.log(err)
            res.status(500).json({message:err.message})
        }
     };