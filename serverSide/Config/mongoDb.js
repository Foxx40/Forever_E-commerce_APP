import mongoose from "mongoose";

const connectDB = async ()=>{

    try {
        mongoose.connection.on('connected', ()=>{
            console.log("Db connected")
        })
         await mongoose.connect(process.env.MONGO_URI)
         console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB
