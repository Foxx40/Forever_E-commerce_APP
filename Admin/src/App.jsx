import React , {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import SlideBar from './components/SlideBar'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';


export const currency = "$"

 export const backendUrl = import.meta.env.VITE_BACKENDURL
const App = () => {
   const [token , setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): "")

   useEffect(()=>{
     localStorage.setItem("token" , token)
   } ,[token])

  return (
    <div className='bg-gray-50 min-h-screen '>
      {
        token === '' ? <Login setToken={setToken}/> : (
         
      <>
      <Navbar setToken={setToken}/>
      <hr />
      
     <div className='flex w-full '>
     <SlideBar/>
     <div className='w-[70%] mx-auto my-8 text-gray-600 text-base'>
        <Routes>
          <Route path="/add" element={<Add token = {token}/>}/>
          <Route path='/list' element={<List token = {token}/>}/>
          <Route path='/order' element ={<Order token = {token}/>}/>
        </Routes>
     </div>
     </div>
     </>
  )}
   <ToastContainer/>
    </div>
  )
}

export default App
