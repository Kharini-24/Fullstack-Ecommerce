import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>

      {/* Main Footer Content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40">
        
        {/* Logo & Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
          Forever is your one-stop destination for quality products,
            seamless shopping, and exceptional service.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-3">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>
        {/* Get in Touch */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-000-000-000</li>
            <li>contact@forever.com</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <hr />

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500 py-5">
        © 2025 forever.com. All Rights Reserved.
      </p>

    </div>
  );
};

export default Footer;
