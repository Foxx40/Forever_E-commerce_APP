import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/Context'
import Title from '../Components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
const Order = () => {
  const { token , currency , backendUrl} = useContext(ShopContext)
  const [orderData , setOrderData] = useState([])
  const getUserOrders = async()=>{
    try {
      if(!token){
        return toast.error("Please login to view orders")
      }
      const response = await axios.post(`${backendUrl}/api/order/user`, {}, {headers : {token}})
          if(response.data.success){
            let allOrdersData = []
              response.data.orders.map((order)=>{
                order.items.map((item)=>{
                      item.status = order.status
                      item.payment = order.payment
                      item.method = order.paymentMethod
                      item.date = order.date
                      allOrdersData.push(item)
                      console.log(allOrdersData)
                })
              })
              setOrderData(allOrdersData.reverse())
          }
    } catch (error) {
       console.log(error)
       toast.error(error.message)
    }
  }

  useEffect(()=>{
    getUserOrders()
  },[token])
  
  return (
    <div className=' border-t pt-16'>
      <div className='text-2xl mb-3'>
    <Title text1 = 'Your' text2 = "Order"/>
      </div>
      <div className=''>
       {
        orderData.map((item , i)=>{
          return(
            <div key={i} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center gap-4 md:justify-between '>
             <div className='flex items-start gap-6'>
     <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
     <div>
      <p className='text-base font-medium'>{item.name}</p>
      <div className='flex items-center gap-3 mt-2 text-base text-gray-500'>
      <p className=''>{currency}{item.price}</p>
      <p className='text-lg'>{item.size}</p>
      <p className='px-2 sm:py-1 sm:px-3 border bg-slate-50'>{item.quantity}</p>
      </div>
      <p className='mt-4 text-xs font-medium' >Date : <span className='textgray-500 font-light' >{new Date(item.date).toLocaleDateString()}</span></p>
      
      <p className='mt-4 text-xs font-medium' >Payment Method  : <span className='textgray-500 font-light' >{item.method}</span></p>
     </div>
     
             </div>
             <div className='md:w-1/2 flex justify-between'>
      <div className='flex items-center gap-2'>
     <p className='min-w-2 h-2 rounded-full bg-green-400 border'></p>
     <p className='text-sm md:text-base'>{item.status}</p>
      </div>
      <button onClick={()=> getUserOrders()} className='cursor-pointer border text-black rounded-xs text-sm px-8 py-2'>Track Order</button>
     </div>
            </div>
          )
        }) 
       }
      </div>
    </div>
  )
}

export default Order
