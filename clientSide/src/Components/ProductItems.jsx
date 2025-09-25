import React, { useContext } from 'react'
import {ShopContext} from '../context/Context'
import { Link } from 'react-router-dom'

const ProductItems = ({id , image , name , price}) => {
    const {currency} = useContext(ShopContext)

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img className='hover:scale-105 transition ease-in-out duration-300' src={image} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItems
