import express from "express";
import {PlaceOrder , PlaceOrderStripe , PlaceOrderRazorpay , allOrders , userOrders , updateStatus , verifyStripe , verifyRazorpay} from "../controllers/ordeController.js"
import {authUser} from "../middleware/auth.js"
import adminAuth from "../middleware/adminAuth.js";



// admin routes 
const orderRouter = express.Router()
orderRouter.post("/list" , adminAuth , userOrders)
orderRouter.post("/status" , adminAuth , updateStatus)

// method of payment
orderRouter.post("/place" , authUser , PlaceOrder)
orderRouter.post("/stripe" , authUser , PlaceOrderStripe)
orderRouter.post("/razorpay" , authUser , PlaceOrderRazorpay)


// user orders showing frontend
orderRouter.post("/user" , authUser , allOrders)
orderRouter.post("/verify/stripe"  , authUser , verifyStripe)
orderRouter.post("/verify/razorpay" , authUser , verifyRazorpay)

export default orderRouter
