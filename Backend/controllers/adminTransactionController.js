import Transaction from "../Model/Transaction.js"

export const getAllTransactions = async(req,res)=>{
    const transactions = await Transaction.find()
    .populate("user","name email")
    .sort({date:-1})
    res.json(transactions)
}