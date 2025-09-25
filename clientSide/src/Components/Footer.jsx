import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm mb-4">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            orem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged
          </p>
        </div>
        <div>
          <p className="font-medium mb-5 text-xl">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Return Policy</li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-5 text-xl">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Phone: +1 234-567-890</li>
            <li>Email: contact@foreverstore.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-sm text-gray-600 py-5">
          © 2025 Forever Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
