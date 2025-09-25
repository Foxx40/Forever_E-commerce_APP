import express from "express";
import userModel from "../models/userModel.js";

const addCart = async(req , res)=>{
     try {
         const {userId , itemId , size} = req.body
         const userData =await userModel.findById(userId)
         let cartData = await userData.cartData
         if (cartData[itemId]){
            if(cartData[itemId][size]){
               cartData[itemId][size] += 1 
            }
            else{
                cartData[itemId][size] = 1
            }
         }
         else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
         }
         await userModel.findByIdAndUpdate(userId , {cartData})
         console.log(cartData)   
         res.json({success : true , message : "Item added to cart"})
     } catch (error) {
         console.log(error)
         res.json({success : false , message : error.message})
     } 
}



const updateCart = async (req , res)=>{
     try {
        const {userId , itemId , size , quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if(cartData[itemId]){
            cartData[itemId][size] = quantity
            await userModel.findByIdAndUpdate(userId , {cartData})
            
        }
        res.json({success : true , message : "Item updated in cart"})
     } catch (error) {
         console.log(error)
         res.json({success : false , message : error.message})
     }
}


 
const getCart = async(req , res)=>{
     try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        res.json({success : true , cartData})
     } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
     }
}

export {addCart , updateCart , getCart}
