import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaThList, FaPlus, FaBook, FaUserTie } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { FaUserGroup } from "react-icons/fa6";
import { TbWritingSignOff } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { RiUserCommunityLine } from "react-icons/ri";

const Sidebar = ({ closeSidebar }) => {
  const { isLogin } = useAuth();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-200 h-screen z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0">
      <div className="p-3 sm:p-4">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* 🔹 General Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              General
            </h2>
            <div className="flex flex-col gap-2 sm:gap-3 pl-2">
              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <FaHome size={16} />
                Dashboard
              </Link>
              {isLogin && (
                <Link
                  to="/all-blogs"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaThList size={16} />
                  Categories
                </Link>
              )}
            </div>
          </div>

          {isLogin && (
            <>
              {/* 🔹 Blogs Section */}
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                  Blogs
                </h2>
                <div className="flex flex-col gap-2 sm:gap-3 pl-2">
                  <Link
                    to="/user"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FaUserGroup size={16} />
                  Users
                  </Link>
                  <Link
                    to="/following"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    <RiUserCommunityLine size={16} />
                    Connections
                  </Link>
                  <Link
                    to="/create-blog-category"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    <BiCategory size={16} />
                     My Categories 
                  </Link>
                  <Link
                    to="/create-blog"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    < TbWritingSignOff size={16} />
                     Write Blog
                  </Link>
                  <Link
                    to="/your-blogs"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FaBook size={16} />
                      My Blogs
                  </Link>
                  <Link
                    to="/notification"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    <IoMdNotifications size={16} />
                     Notifications
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;