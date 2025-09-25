import React, { useContext, useEffect , useState } from 'react'
import { ShopContext } from '../context/Context'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../Components/CartTotal'
const Cart = () => {
  const {currency , products, cartItems , UpdateQuantity , navigate} = useContext(ShopContext)
  const [cartData , setCartData] = useState([])
  useEffect(()=>{
    const tempData = []
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          tempData.push({_id : items , size : item , quantity : cartItems[items][item]})
          
        }
      }
        
    } 
    setCartData(tempData) 
     console.log(tempData)
  },[cartItems])
  return cartData.length > 0 ? (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
    <Title text1 = 'Your' text2 = "Cart"/>
      </div>
      <div>
        {cartData.map((item , i)=>{

          const productData = products.find((product)=> product._id === item._id)
          return(
            <div key={i} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
               <div className='flex items-start gap-2 sm:gap-6'>
                <img src={productData.images[0]} alt="" className='w-16 sm:w-20' />
                <div>
                  <p className='text-xs font-medium sm:text-lg'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
        <p>{currency}{productData.price}</p>
        <p className='px-2 sm:py-1 sm:px-3 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
               </div>
               <input onChange={(e)=> e.target.value === '' || e.target.value < 1 ? null : UpdateQuantity(item._id , item.size , Number(e.target.value)) } type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
               <img onClick={()=>UpdateQuantity(item._id , item.size , 0)} src={assets.bin_icon} alt="" className='w-4 cursor-pointer sm:w-5' />
            </div>
          )
        })}
      </div>
      <div className='flex justify-end my-20'>
       <div className='w-full sm:w-1/3'>
       <CartTotal/>
       <div className='w-full text-end'>
        <button onClick={()=>navigate('/placeorder') } className='bg-black text-white text-sm my-8 px-8 py-2'>Checkout</button>

       </div>
        </div> 
      </div>
    </div>
  ) : (
    <div >
      <p>Cart is empty</p>
    </div>
  )
}

export default Cart
