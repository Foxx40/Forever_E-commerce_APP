import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/Context";
import {assets} from "../assets/frontend_assets/assets";
import RelatedProduct from "../Components/RelatedProduct";
import { ToastContainer } from 'react-toastify';
const Product = () => {
  const { id } = useParams();
  const { products , currency , addTOCart } = useContext(ShopContext);
  const [getproductData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(null);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage(item.images[0]);
      }

      return null;
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [id]);

  return getproductData ? (
    
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-600 opacity-100  ">
      
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
      
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19%] w-full gap-2  ">
            {getproductData.images.map((item, index) => {
              return (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  alt=""
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                  key={index}
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto " src={image} alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium  text-2xl mt-2">{getproductData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_dull_icon} alt="" className="w-5" />
            <p className="text-xs text-gray-500 pl-2">4(200)</p>
          </div>
           <p className="mt-5 text-3xl font-medium">{currency}{getproductData.price}</p>
           <p className="mt-5 text-gray-400 md:w-4/5">{getproductData.description}</p>
             <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
              {getproductData.sizes.map((item,index)=>{
                return(
                  <button onClick={()=>setSize(item)} className={`px-4 py-1 border border-gray-400 ${size === item ? "bg-black text-white" : ""}`}  key={index}>{item}</button>
                )
              })}
              </div>
             
             </div>
             <button onClick={()=>addTOCart(getproductData._id , size , setSize) } className="bg-black text-white text-sm px-8 py-3 active:bg-gray-700">Add to Cart</button>
             <hr className="mt-8 w-4/5 border border-gray-400" />
             <div className="mt-5 text-sm text-gray-500 flex flex-col gap-2">
              <p>100% Original Product</p>
              <p>Cash on Delivery Available</p>
              <p>Easy return and refund policy in 7 days</p>
              
             </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
 <b className="border border-gray-400 px-5 py-3 text-sm">Description</b>
 <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-gray-500">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate culpa reiciendis ab cum? Unde illum a explicabo quis similique dicta alias eum ducimus tenetur vitae, laudantium consequuntur omnis veniam laborum?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate culpa reiciendis ab cum? Unde illum a explicabo quis similique dicta alias eum ducimus tenetur vitae, laudantium consequuntur omnis veniam laborum?</p>
          
        </div>
      </div>

      {/* related products */}
      <RelatedProduct category={getproductData.category} subCategory={getproductData.subCategory} />
     
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
