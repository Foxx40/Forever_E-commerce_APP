
import express from "express";
import {authUser} from "../middleware/auth.js";
import { addCart , updateCart , getCart} from "../controllers/cartControler.js";

const cartRouter = express.Router()
cartRouter.post("/add" , authUser, addCart)
cartRouter.post("/update",authUser,updateCart)
cartRouter.post("/get",authUser,getCart)

export default cartRouter