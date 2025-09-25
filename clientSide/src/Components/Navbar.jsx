import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useState , useContext } from "react";
import { ShopContext } from "../context/Context";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  
  const [visible, setVisible] = useState(false);
  const { setShowSearch , getCartCount , token ,setToken , setCartItems , navigate} = useContext(ShopContext)

  const {pathname} = useLocation()
 const logOut = ()=>{
  navigate("/Login")
    localStorage.removeItem('token')
    setToken("")
    setCartItems({})
    
 }


  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} className="w-32" alt="logo" />
      </Link>
      <ul className="hidden md:flex gap-5 text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to="/">
          <p className="hover:text-gray-500">HOME</p>{" "}
          <hr className=" w-2/4 h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p className="hover:text-gray-500">COLLECTION</p>
          <hr className=" w-2/4 h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p className="hover:text-gray-500">ABOUT</p>
          <hr className=" w-2/4 h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p className="hover:text-gray-500">CONTACT</p>
          <hr className=" w-2/4 h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex gap-6 items-center">
       {pathname.includes('collection') ? (
        <img src={assets.search_icon} className="w-5 cursor-pointer" alt="" onClick={()=>setShowSearch(true)} />
       ):(
       <div className="w-5">
        
       </div>
       )}
        <div className="group relative">
          <img onClick={()=>token ? '' : navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""/>
         {/* Dropdown Menu */}
        {
          token ? (
            <div className="hidden group-hover:block dropdown-menu right-0 pt-4 absolute">
            <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black"> My Profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Order</p>
              <p onClick={logOut} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
          ) : null
        }
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 cursor-pointer"
            alt=""
          />
          <p className=" w-4 absolute bottom-[-5px] right-[-5px] rounded-full  leading-4 bg-black text-white aspect-square text-[8px] text-center">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 min-w-5 cursor-pointer md:hidden"
          alt=""
        />
      </div>
      {visible && (
        <div
          className={`absolute top-0 right-0 bottom-0  bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-700">
            <div
              className="flex items-center gap-4 p-3 cursor-pointer"
              onClick={() => setVisible(false)}
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180 cursor-pointer"
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink
              className="py-2 pl-6  bg-gray-50 border-b-[2.5px] border-white hover:bg-gray-300"
              onClick={() => {
                setVisible(false);
              }}
              to="/"
            >
              <p>Home</p>
            </NavLink>
            <NavLink
              className="py-2 pl-6  bg-gray-50 border-b-[2.5px] border-white hover:bg-gray-300"
              onClick={() => {
                setVisible(false);
              }}
              to="/collection"
            >
              <p>Collection</p>
            </NavLink>
            <NavLink
              className="py-2 pl-6  bg-gray-50 border-b-[2.5px] border-white hover:bg-gray-300"
              onClick={() => {
                setVisible(false);
              }}
              to="/about"
            >
              <p>About</p>
            </NavLink>
            <NavLink
              className="py-2 pl-6  bg-gray-50 border-b-[2.5px] border-white hover:bg-gray-300"
              onClick={() => {
                setVisible(false);
              }}
              to="/contact"
            >
              <p>Contact</p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
