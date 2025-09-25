
import orderModel from "../models/OrderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import Razorpay from "razorpay"



// stripe gateway
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// razorpay gateway
   const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY
   })


// 

const currency = 'inr'
const DeliveryCharges = 10




const PlaceOrder = async(req , res)=>{
    try {
         const {userId , items, amount , address } = req.body
         const orderData = {
            userId, 
            items,      
            amount, 
            address , 
            paymentMethod : "Cash On Delivery",
            payment : false,
            date : Date.now(),
         }
         const newOrder = new orderModel(orderData)
         await newOrder.save()
              
         await userModel.findByIdAndUpdate(userId , {cartData : {}})

         res.json({success : true , message : "Order placed successfully" , newOrder})
         

    } catch (error) {
        res.json({success : false , message : error.message})
    }
}



const PlaceOrderStripe = async(req , res)=>{
    try {
        const {userId , items, amount , address } = req.body
        const {origin} = req.headers
        const orderData = {
            userId, 
            items,      
            amount, 
            address , 
            paymentMethod : "Stripe",
            payment : false,
            date : Date.now(),
         }
         const newOrder = new orderModel(orderData)
         await newOrder.save()
         
         const line_Items = items.map(item =>({
             price_data : {currency  , product_data : {name : item.name} ,unit_amount : item.price*100 },
             quantity : item.quantity 
         }))


        line_Items.push({
            price_data : {
                currency : currency.toUpperCase() , product_data : {
                    name : "Delivery Charges" 
                },
                unit_amount : DeliveryCharges 
            },
            quantity :  1
        })  

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
         
            mode : "payment",
            line_items : line_Items 
        })
          res.json({success : true , session_url : session.url})
    } catch (error) {
        res.json({success : false , message : error.message}) 
    }

}


const verifyStripe = async(req , res)=>{
    try {
        const {orderId  , success , userId} = req.body
        console.log(orderId , success , userId)
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId , {payment : true})
            await userModel.findByIdAndUpdate(userId , {cartData : {}})
            res.json({success : true , message : "Order placed successfully"})
        }else{
           
            res.json({success : false , message : "Order failed"})
        }
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

const PlaceOrderRazorpay = async(req , res)=>{
    try {
        const {userId , items, amount , address } = req.body
     
        const orderData = {
            userId, 
            items,      
            amount, 
            address , 
            paymentMethod : "Razorpay",
            payment : false,
            date : Date.now(),
         }
         const newOrder = new orderModel(orderData)
         await newOrder.save()
         const options = {
            amount : amount * 100,
            currency : currency.toUpperCase() ,
            receipt : newOrder._id.toString()
         }
       const order =  await razorpay.orders.create(options)
         res.json({success : true , order})
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

const verifyRazorpay = async(req , res)=>{
    try {
       const {userId , razorpay_order_id ,} = req.body
       const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
       if(orderInfo.status === "paid"){
        await orderModel.findByIdAndUpdate(orderInfo.receipt , {payment : true})
        await userModel.findByIdAndUpdate(userId , {cartData : {}})
        res.json({success : true , message : "Payment successful"})
       }else{
        res.json({success : false , message : "Payment failed"})
       }
       
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

const allOrders = async(req, res) =>{
    try {
            const {userId} = req.body 
            const orders  = await orderModel.find({userId})
            res.json({success : true , orders})


    } catch (error) {
        res.json({success : false , message : error.message , })
    }
}
const userOrders = async(req, res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success : true , orders})
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}
const updateStatus = async(req, res) =>{
    try {
        const {orderId  , status} = req.body
        await orderModel.findByIdAndUpdate(orderId , {status})
        res.json({success : true , message : "Order status updated successfully"})
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

export {PlaceOrder , PlaceOrderStripe , PlaceOrderRazorpay , allOrders , userOrders , updateStatus , verifyStripe  , verifyRazorpay }