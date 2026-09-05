import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected successfully")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

export default connectDB