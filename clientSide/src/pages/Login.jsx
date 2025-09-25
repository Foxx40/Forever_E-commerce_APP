import React, { useContext, useState , useEffect} from 'react'
import { ShopContext } from '../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const [currentForm , setCurrentForm] = useState('Login')
  const {token , setToken , navigate , backendUrl} = useContext(ShopContext)
  const [email , setEmail]= useState("")
  const [password , setPassword] = useState("")
  const [name , setName] = useState("")
  console.log(currentForm)
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
       if(currentForm === 'sign-up'){
        const response = await axios.post(`${backendUrl}/api/user/register` , {email , password , name})
        console.log(response)
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token" , response.data.token)
          navigate('/collection')
          toast.success(response.data.message , {hideProgressBar:true,autoClose : 5000})

        }
        else{
          toast.error(response.data.message , {hideProgressBar:true,autoClose : 5000})
        }
       }
       
       else{
        const response = await axios.post(`${backendUrl}/api/user/login` , {email , password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token" , response.data.token)
          navigate('/collection')
          toast.success(response.data.message , {hideProgressBar:true,autoClose : 5000})

        }
       }
    } catch (error) {
      console.log(error)
      toast.error(error.message , {hideProgressBar:true,autoClose : 5000})
      }

     
  }
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      
      navigate('/')
    }
    else{
      navigate('/login')
    }
  },[])
  return (
   <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center w-[90%] sm:w-96 mt-14 m-auto text-gray-800 '>
    <div className='inline-flex gap-2 items-center mb-2 mt-10'>
 <p className='prata-regular text-3xl'>{currentForm}</p>
 <hr className='bordernone h-[1.5px] w-8 bg-gray-800' />
    </div>
   {currentForm === 'Login'? '' : <input onChange={(e)=>setName(e.target.value)} type="text" className='w-full px-3 py-2 mt-2 border-gray-800 border ' placeholder='Name' required/>} 
    <input onChange={(e)=>setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border-gray-800 border ' placeholder='Email' required/>
    <input onChange={(e)=>setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border-gray-800 border ' placeholder='Password' required/>
    <div className='w-full flex justify-between text-sm mt-[-8px] '>
    <p className='cursor-pointer'>Forgot Password?</p>
   {currentForm === 'Login'? <p className='cursor-pointer'onClick={()=>setCurrentForm('sign-up')}>Create Account</p> : <p className='cursor-pointer' onClick={()=>setCurrentForm('Login')}>Login</p>}
    </div>
    <button  type='submit' className=' bg-gray-800 font-light text-white py-2 px-6 '>{currentForm === 'Login'? 'Sign In' : 'sign-up'}</button>
   </form>
  )
}

export default Login
