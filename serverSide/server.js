import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Config/mongoDb.js'
import connectCloudnary from './Config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/OrderRoute.js'

const app = express()
const port = process.env.PORT 
connectDB()
connectCloudnary()      




app.use(express.json());
app.use(cors())
app.use("/api/user" , userRouter)
app.use("/api/products" , productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/" , (req , res)=>{
    res.send("Our API")
})

app.listen(port , ()=>console.log(`Server running on port ${port}`))