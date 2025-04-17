import React, { useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";


const Navbar = () => {
  const { isLogin, logout, iconUrl } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-white shadow-md px-4 py-2 flex justify-between items-center sticky top-0 z-50">
        {/* Left - Hamburger menu for mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
          >
            <IoMdMenu size={24} />
          </button>
        </div>

        {/* Center - Logo */}
        <Link to="/">
          <img src={logo} alt="" className="h-12" />
        </Link>

        {/* Right - Login / Profile */}
        <div className="flex items-center gap-3">
          {isLogin ? (
            <>
              <Link
                to="/profile"
                className="p-1 rounded-full hover:scale-105 transition"
              >
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt="User Icon"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUser size={20} />
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="hidden text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm border border-green-600 text-green-600 px-3 py-1 rounded hover:bg-green-600 hover:text-white transition flex items-center gap-1"
            >
              <FaSignInAlt size={14} /> Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar for mobile only */}
      {showSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          ></div>
          <Sidebar closeSidebar={closeSidebar} />
        </>
      )}
    </>
  );
};

export default Navbar;
