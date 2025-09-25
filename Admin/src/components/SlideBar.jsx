import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";
const SlideBar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div
        className="flex flex-col gap-4 pt-6 pl-[20%] text-base
      "
      >
        <NavLink
          className="flex items-center  gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/add"
        >
          <img className="w-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block ">Add Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/list"
        >
          <img className="w-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block ">List</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/order"
        >
          <img className="w-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block ">Order</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SlideBar;
