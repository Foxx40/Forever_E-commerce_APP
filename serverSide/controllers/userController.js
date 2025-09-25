// Route for user login
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET)
}



const loginUser = async (req , res)=>{
     try{
        const {email, password} = req.body;
            
        // check if user exists or not
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success : false , message : "user does not exist"})
        }

    // compare the password
    const isPasswordMatched = await bcrypt.compare(password , user.password)
    if(!isPasswordMatched){
        return res.json({success : false , message : "Invalid password"})
    }

    const token = createToken(user._id)

    res.json({success : true , token})

     }
     catch(error){
        console.log(error)
        res.json({success : false , message : error.message})
     }
}

// Route for user register
const registerUser = async (req , res)=>{
     try {
         const {name , email , password} = req.body

         // check if user already exists or not 
         const existUser = await userModel.findOne({email})
         if(existUser){
            return res.json({success : false , message : "User already exists"})
         }

         // validate the user data
         if(!validator.isEmail(email)) {
 return res.json({success : false , message : "Invalid email"})
         }
         if(password.length < 8) {
           return res.json({success : false , message : "password must be at least 8 characters long"})
         }

         // hash the password
        const salt  = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        // create the user
        const newUser = new userModel({
            name , 
            email,
             password : hashedPassword
        })
       const user = await newUser.save()

       const token =createToken(user._id)

       res.json({success : true , token})
         
         
         
     } catch (error) {
         console.log(error)
         res.json({success : false , message : error.message})
     }
}

// Route for admin login
const adminLogin = async (req , res)=>{
    
    try {

        const {email , password} = req.body
        if(email === process.env.EMAIL && password === process.env.PASSWORD){
            const token = jwt.sign(email+password , process.env.JWT_SECRET)
            res.json({success : true , token})
        }
        else{
            res.json({success : false , message : "Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }

}

export {loginUser , registerUser , adminLogin}