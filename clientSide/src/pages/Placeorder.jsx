import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const {
    navigate,
    token,
    backendUrl,
    cartItems,
    getCartAmount,
    delivery,
    products,
    setCartItems,
  } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const InitiateRazorpay =  (order) => {
    const options = {
          
      key : import.meta.env.VITE_RAZORPAY_KEY,
      amount : order.amount,
      currency : order.currency,
      name : "Forever",
      description : "Test Transaction",
      order_id : order.id,
      
      handler : async (response)=>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/order/verify/razorpay` ,  response , {headers : {token}})
            if(data.success){
               navigate("/orders")
               setCartItems({})
            }
            else{
              navigate("/carts")
              toast.error(data.message , {hideProgressBar:true , autoClose:5000})
            }
        } catch (error) {
          toast.error(error.message , {hideProgressBar:true , autoClose:5000})
            
        }   
      }

    }
    const rzp = new window.Razorpay(options)
    rzp.on("payment.failed" , (response)=>{
      navigate("/carts")
      toast.error("Payment failed" , {hideProgressBar:true , autoClose:5000})
    })
    rzp.open()
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery,
      };
      switch (paymentMethod) {
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success(response.data.message, {
              hideProgressBar: true,
              autoClose: 5000,
            });
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message, {
              hideProgressBar: true,
              autoClose: 5000,
            });
          }
          break;
        }
        case "razorpay":
          {
            const response = await axios.post(
              `${backendUrl}/api/order/razorpay`,
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
                InitiateRazorpay(response.data.order)
                
            } else {
              toast.error(response.data.message, {
                hideProgressBar: true,
                autoClose: 5000,
              });
            }
          }
          break;
        case "stripe":
          {
            const response = await axios.post(
              `${backendUrl}/api/order/stripe`,
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              toast.success(response.data.message, {
                hideProgressBar: true,
                autoClose: 5000,
              });
              const {session_url} = response.data
              window.location.replace(session_url)
            } else {
              toast.error(response.data.message, {
                hideProgressBar: true,
                autoClose: 5000,
              });
            }
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        hideProgressBar: true,
        autoClose: 5000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      <div className="flex flex-col gap-4 w-full sm:w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="Delivery" text2="Information" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 ">
          <input
            required
            onChange={handleFormChange}
            name="firstName"
            value={formData.firstName}
            className="border-gray-300 border px-2 py-1.5 text-sm w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={handleFormChange}
            name="lastName"
            value={formData.lastName}
            className="border-gray-300 border px-2 py-1.5 text-sm w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={handleFormChange}
          name="email"
          value={formData.email}
          className="border-gray-300 border px-2 py-1.5 text-sm w-full"
          type="email"
          placeholder="Email"
        />
        <input
          required
          onChange={handleFormChange}
          name="street"
          value={formData.street}
          className="border-gray-300 border px-2 py-1.5 text-sm w-full"
          type="text"
          placeholder="Street Address"
        />
        <div className="flex flex-col sm:flex-row gap-3 ">
          <input
            required
            onChange={handleFormChange}
            name="city"
            value={formData.city}
            className="border-gray-300 border px-2 py-1 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={handleFormChange}
            name="state"
            value={formData.state}
            className="border-gray-300 border px-2 py-1 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 ">
          <input
            required
            onChange={handleFormChange}
            name="zipCode"
            value={formData.zipCode}
            className="border-gray-300 border px-2 py-1 w-full"
            type="number"
            placeholder="zip-code"
          />
          <input
            required
            onChange={handleFormChange}
            name="country"
            value={formData.country}
            className="border-gray-300 border px-2 py-1 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={handleFormChange}
          name="phoneNumber"
          value={formData.phoneNumber}
          className="border-gray-300 border px-2 py-1.5 text-sm w-full"
          type="tel"
          placeholder="Phone Number"
        />
      </div>
      {/* right side */}
      <div className="mt-8 ">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="Payment" text2="Method" />
          {/* payment method */}
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div
              onClick={() => setPaymentMethod("stripe")}
              className="flex items-center gap-3 p-2 px-3 cursor-pointer border"
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border-gray-200 border ${
                  paymentMethod === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setPaymentMethod("razorpay")}
              className="flex items-center gap-3 p-2 px-3 cursor-pointer border"
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border-gray-200 border ${
                  paymentMethod === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-3 p-2 px-3 cursor-pointer border"
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full  border-gray-200 border ${
                  paymentMethod === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm">Cash On Delivery</p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white text-sm my-8 px-8 py-2"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
