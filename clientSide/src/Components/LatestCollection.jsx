import React, { useContext  , useEffect, useState} from 'react'
import {ShopContext} from '../context/Context'
import Title from './Title'
import ProductItems from './ProductItems'
const LatestCollection = () => {
    const {products} = useContext(ShopContext) 
    const [latestProducts , setLatestProducts] = useState([])

    useEffect(() => {
      setLatestProducts(products.slice(0,10))
        
    },[products])
    
   
    
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>

        <Title text1="LATEST" text2="COLLECTIONS"/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
      </div>
      {/*Rendering Products*/}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-10'>
        {
          latestProducts.map((product ) => (
            <ProductItems key={product._id } id={product._id} image={product.images} name={product.name} price={product.price}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
