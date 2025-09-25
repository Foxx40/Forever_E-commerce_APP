import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../App";
const List = ({token}) => {
  const [products, setProducts] = useState([]);


  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/getall");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const deleteItem = async(id)=>{
    const response = await axios.post(backendUrl + "/api/products/remove" , {id} , {headers:{token}})
    if(response.data.success){
      toast.success(response.data.message)
      fetchList()
    }
    else{
      toast.error(response.data.message)
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  console.log(products);
  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table  */}
        <div className="hidden  md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1  bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
         
          <b className="text-center">Actions</b>
        </div>
        {/* Product list */}
        {
          products.map((item , index)=>{
            return(
              <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 max-md:gap-y-2 gap-x-2  bg-gray-100 text-sm">
                <img className="w-12" src={item.images[0]} alt="" />
                <p className="px-5 w-full font-bold">{item.name}</p>
                <p>{currency}{item.price}</p>
                <p>{item.category}</p>
                <p className="font-sans text-right md:text-center cursor-pointer text-lg" onClick={()=>deleteItem(item._id)}>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default List;
