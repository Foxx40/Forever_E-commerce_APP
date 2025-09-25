import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../Components/NewsLetterBox";
const Contact = () => {
  return (
    <div className="">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="Contact" text2="Us" />
      </div>
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 ">
        <img className="w-full md:w-[480px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center  gap-6 items-start">
          <p className="text-gray-800 font-semibold text-xl">Our Store</p>
          <p className="text-gray-500 font-semibold">
            3394 Market St, San Francisco, CA 94102
          </p>
          <p className="text-gray-500 font-semibold">
            Phone: +1 (555) 123-4567
          </p>
          <p className="text-gray-500 font-semibold">Email: info@example.com</p>
          <p className="text-gray-800 text-xl font-semibold">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Forever is always looking for talented individuals to join our team.
            If you have a passion for fashion and a desire to make a difference,
            we encourage you to apply for a position at Forever.
          </p>
          <button className="border text-black rounded-xs text-sm px-8 py-2 hover:bg-black hover:text-white transition-all duration-500 ">
            Apply Now
          </button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
