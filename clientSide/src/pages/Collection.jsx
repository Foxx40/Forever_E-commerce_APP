import React, { useContext, useState } from "react";
import { ShopContext } from "../context/Context";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../Components/Title";
import ProductItems from "../Components/ProductItems";
import { useEffect } from "react";
const Collection = () => {
  const { products , search,  } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState("relavent")

  const toggleCategory = (e) => {
    if(category.includes(e.target.value))
      setCategory((prev)=>prev.filter((item)=>item!==e.target.value))
    else
      setCategory((prev)=>[...prev,e.target.value])
  }
  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value))
      setSubCategory((prev)=>prev.filter((item)=>item!==e.target.value))
    else
      setSubCategory((prev)=>[...prev,e.target.value])
  }
 
 const appyFilter = ()=>{
  let productsCopy = products.slice()
   if(search){
    productsCopy = productsCopy.filter((product)=> product.name.toLowerCase().includes(search.toLowerCase()))
   }
  if(category.length > 0){
         productsCopy = productsCopy.filter((product)=> category.includes(product.category))
  }
  if(subCategory.length>0){
     productsCopy =  productsCopy.filter((product)=> subCategory.includes(product.subCategory))
  }
  setFilteredProducts(productsCopy)
 }

 const sortProducts = ()=>{
   let filteredProductsCopy = filteredProducts.slice()
   switch(sortBy){
    case 'low-high' :
      setFilteredProducts(filteredProductsCopy.sort((a,b)=>a.price-b.price))
      break;
      case 'high-low': 
      setFilteredProducts(filteredProductsCopy.sort((a,b)=>b.price-a.price))
      break;
      default : 
      appyFilter()
      break;
   }
 }

  useEffect(() => {
    appyFilter()
    

  },[category,subCategory , search ,products])
  useEffect(() => {
    sortProducts()
  },[sortBy])
 
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* left side : filter option*/}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center gap-2 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
          Filter <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* filter options Category */}
        <div
          className={`border border-gray-400 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">Category</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} />
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>

        {/* filter options SubCategory */}

        <div
          className={`border border-gray-400 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory } />
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory } />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory } />
              Winterwear
            </p>
          </div>
        </div>
        {/* right side : products*/}
       
      </div>
      <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1="ALL" text2="COLLECTIONS"/>  
            <select onChange={(e)=>setSortBy(e.target.value)} className="border border-gray-400 px-2 text-sm">
              <option value="relavent">Sort by Relavent</option>
              <option value="low-high">Sort by low to high</option>
              <option value="high-low">Sort by high to low</option>
              
            </select>
       
          </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-10">
 {
  filteredProducts.map((product) => (
    <ProductItems key={product._id} id={product._id} image={product.images} name={product.name} price={product.price}/>
  ))
 }
         </div>

        </div>
    </div>
  );
};

export default Collection;
