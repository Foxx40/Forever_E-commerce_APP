import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../Components/Title'
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
  return (
    <div className='min-h-[80vh] '>
      <div className='text-2xl text-center  py-16 border-t'>
    <Title text1 = 'About' text2 = "Us"/>
      </div>
      <div className='my-10 flex flex-col gap-20 md:flex-row'>
        <img className='w-full md:w-[440px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Our Story</p>
        <p>At our core, we believe in the power of fashion to connect people and create meaningful experiences. Founded with a passion for quality and craftsmanship, our journey began with a simple vision: to offer our customers the best in fashion, while maintaining a commitment to sustainability and ethical practices. </p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to provide our customers with the highest quality fashion products, while maintaining a commitment to sustainability and ethical practices. We are committed to offering our customers the best in fashion, while maintaining a commitment to sustainability and ethical practices.</p>
        </div>
       
      </div>
      <div className='text-xl py-17'>
<Title text1 = 'Why' text2 = "Choose Us?"/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-4'>
         <div className='border px-10 py-8 md:px-20 flex flex-col gap-5'>
          <b>Quality & Durability</b>
          <p>Our products are made with the highest quality materials and are designed to last. We use only the best materials to ensure that our products are durable and long-lasting.</p>

         </div>
         <div className='border px-10 py-8 md:px-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p>Our Concierge Service is available to assist you with any questions or concerns you may have. Our team is available to answer any questions you may have and help you find the perfect piece for you.</p>

         </div>
         <div className='border px-10 py-8 md:px-20 flex flex-col gap-5'>
          <b>Service</b>
          <p>Our Concierge Service is available to assist you with any questions or concerns you may have. Our team is available to answer any questions you may have and help you find the perfect piece for you.</p>

         </div>
      </div>
       <NewsLetterBox/>
    </div>
  )
}

export default About
