import React, { useContext , useState , useEffect } from 'react'
import { ShopContext } from '../context/Context'
import ProductItems from './ProductItems'
import Title from './Title'

const RelatedProduct = ( {category , subCategory} ) => {
    const {products} = useContext(ShopContext)
    const [related , setRelated] = useState([])

    useEffect(() => {
        if(products.length > 0){
            let productCopy = products.slice()
            productCopy = productCopy.filter((item)=> item.category === category)

            productCopy = productCopy.filter((item)=> item.subCategory === subCategory)
            setRelated(productCopy.slice(0,5))

           
        }
    }, [products])
    
  return (
    <div className='my-24'>
      <div className='text-center py-8 text-3xl'>
        <Title text1="Related" text2="Products"/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-10">
      {
        related.map((item)=>{
          return(
            <ProductItems key={item._id} id={item._id} image={item.images} name={item.name} price={item.price}/>
          )
        })
      }
      </div>
    </div>
  )
}

export default RelatedProduct
