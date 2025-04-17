import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-white lg:bg-gray-900 text-gray-800 lg:text-gray-300 py-10 px-4 sm:px-6">
      {/* -------- Desktop / Laptop Footer -------- */}
      <div className="hidden lg:grid container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Branding & About */}
        <div className="space-y-3">
          <img
            src={logo}
            alt="logo"
            className="h-20 w-40 object-contain rounded-sm bg-white"
          />
          <p className="text-sm text-gray-600 lg:text-gray-400">
            LikhoIndia 2025 - Empowering voices through blogging. Join us to
            share and explore stories that matter.
          </p>
        </div>

        {/* Social Media */}
        <div>
         
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="about" className="hover:text-blue-500 transition">
                About Us
              </a>
            </li>
            <li>
              
            </li>
          </ul>
        </div>

        {/* Subscribe Section (Laptop/Desktop) */}
        <div>
          
        </div>
      </div>

    
    </footer>
  );
};

export default Footer;
