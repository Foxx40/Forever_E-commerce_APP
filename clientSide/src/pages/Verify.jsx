import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/Context";
 import { useContext , useEffect } from "react"
 import { useSearchParams } from "react-router-dom"
 import axios from "axios"
 import { toast } from "react-toastify"
const Verify = () => {

     const {navigate , token , backendUrl , setCartItems} = useContext(ShopContext)
     
     const [searchParams , setSearchParams] = useSearchParams()

     const success = searchParams.get("success")
     const orderId = searchParams.get("orderId")
    console.log(success , orderId)
   const verifyPayment = async () => {
    try {
    if (!token){
        navigate("/login")
    }
    const response = await axios.post(`${backendUrl}/api/order/verify/stripe` , {success , orderId} , {headers:{token}})
     if(response.data.success){
        navigate("/orders")
        setCartItems({})
       
     }
     else{
        navigate("/carts")
       
     }
        
    } catch (error) {
        toast.error(error.message , {hideProgressBar:true , autoClose:5000})
    }
   }

   useEffect(()=>{
    verifyPayment()
   },[token])

    return (
        <div>
            
        </div>
    )
}




export default Verify