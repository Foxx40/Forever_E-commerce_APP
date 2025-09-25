import React from 'react'

const NewsLetterBox = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <div className='text-center my-10 '>
      <p className='text-2xl font-semibold text-gray-700'>Subscribe to our newsletter</p>
      <p className='text-gray-600 mt-3'>Get the latest updates on new arrivals, special offers and more</p>
      <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex justify-center items-center gap-4 mx-auto my-6 pl-3 border   '>
    <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/>
    <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
 