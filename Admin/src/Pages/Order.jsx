import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);


  console.log(orders);

  const getUsersOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async(e , orderId) => {

    try {
      const status = e.target.value
      const response = await axios.post(`${backendUrl}/api/order/status` , {orderId , status} , {headers : {token}})
      if(response.data.success){
        toast.success(response.data.message)
        await getUsersOrders()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  useEffect(() => {
    getUsersOrders();
  }, [token]);
  return (
    <div>
      <h3>Orders List</h3>
      <div className="flex flex-col gap-3">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-400 p-5  rounded-md"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="mt-3 mb-2 font-semibold" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street} </p>
                <p>
                  {order.address.city} , {order.address.state} ,{" "}
                  {order.address.country} , {order.address.zipCode}
                </p>
              </div>
              <p>{order.address.phone}</p>
              <p>{order.payment}</p>
            </div>
            <div>
              <p className="mt-3">Items : {order.items.length}</p>
              <p>Payment : {order.paymentMethod}</p>
              <p>Payment Status : {order.payment ? "Paid" : "Not Paid"}</p>
              <p>Order Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-base mt-3 font-semibold">
              {currency}
              {order.amount}
            </p>
            <select onChange={(e)=>statusHandler(e , order._id)} value={order.status} className="p2 font-semibold mt-3">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out Of Delivery">Out Of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
