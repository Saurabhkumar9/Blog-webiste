import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const BlogCard = ({ blog }) => {
  const { isLogin } = useAuth();  
  const navigate = useNavigate();

  return isLogin ? ( 
    <div 
      onClick={() => navigate(`/blogs/details/${blog._id}`)} 
      className="w-full sm:w-1/2 lg:w-1/3 p-2 sm:p-3 cursor-pointer"
    >
      <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
        <img
          src={blog.image  || logo}
          alt={blog.title}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-bold text-gray-800">{blog.title}</h2>
          <p className="text-xs sm:text-sm text-gray-600">{blog.date}</p>
          <p className="text-xs sm:text-sm text-gray-500">
            By: <span className="font-semibold">{blog.author}</span>
          </p>
          <p className="mt-2 text-xs sm:text-sm text-gray-700 line-clamp-3">
            {blog.description}
          </p>
        </div>
      </div>
    </div>
  ) : (  
    <div className="text-red-500 text-center font-semibold">
      Please login to view blogs
    </div>
  );
};

export default BlogCard;
