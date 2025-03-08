import React, { useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { isLogin, logout, iconUrl } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-stone-300 shadow-sm px-3 sm:px-4 py-2">
        {/* Left Side - Menu Button */}
        <div className="flex-none lg:hidden">
          <button
            onClick={toggleSidebar}
            className="btn btn-square btn-ghost p-1 sm:p-2"
          >
            <IoMdMenu size={20} />
          </button>
        </div>

        {/* Center - Logo */}
        <div className="flex-1 text-sm sm:text-lg">
          <Link to="/" className="btn btn-ghost text-gray-800 text-base sm:text-xl font-semibold">
            Blogs
          </Link>
        </div>

        {/* Right Side - Login / Profile & Logout */}
        <div className="flex-none flex items-center gap-2 sm:gap-4">
          {isLogin ? (
            <>
              <Link to="/profile" className="btn btn-outline btn-primary btn-sm sm:btn-md">
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt="User Icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                ) : (
                  <FaUser size={18} />
                )}
              </Link>
              <button
                className="btn btn-outline btn-error btn-sm sm:btn-md"
                onClick={logout}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login"
              className="btn btn-outline btn-success btn-sm sm:btn-md flex items-center gap-1 sm:gap-2"
            >
              <FaSignInAlt size={16} /> <span className="text-xs sm:text-sm">Sign In</span>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar with Backdrop */}
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