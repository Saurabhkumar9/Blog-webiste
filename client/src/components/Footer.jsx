import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-200 lg:bg-gray-900 text-gray-700 lg:text-gray-300 py-8 px-4 sm:px-6">
      {/* Footer Content (Visible on lg screens) */}
      <div className="container mx-auto hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Branding & About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 lg:text-white">
            LikhoIndia
          </h2>
          <p className="text-sm text-gray-600 lg:text-gray-400">
            LikhoIndia 2025 - Empowering voices through blogging. Join us to
            share and explore stories that matter.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 lg:text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-300 lg:bg-gray-700 rounded-full hover:bg-blue-500 transition-colors"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-300 lg:bg-gray-700 rounded-full hover:bg-blue-400 transition-colors"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-300 lg:bg-gray-700 rounded-full hover:bg-red-500 transition-colors"
            >
              <FaYoutube size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-300 lg:bg-gray-700 rounded-full hover:bg-blue-600 transition-colors"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-300 lg:bg-gray-700 rounded-full hover:bg-pink-500 transition-colors"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section (Visible on all screens) */}
      <div className="text-center mt-8 text-sm border-t border-gray-300 lg:border-gray-700 pt-4">
        &copy; 2025 LikhoIndia. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
