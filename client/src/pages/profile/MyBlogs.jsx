import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const BASE_API_URL = import.meta.env.VITE_API_URL;

const MyBlogs = () => {
  const { sendToken } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState({});

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/show-blog`, {
        headers: {
          Authorization: `Bearer ${sendToken}`,
        },
      });

      if (response.data.success) {
        setBlogs(response.data.showBlog);
      }
    } catch (error) {
      // console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // **Delete Blog Function**
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${BASE_API_URL}/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${sendToken}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data?.message || error.message);
      toast.error(error.response.data.message);
    }
  };

  // **Toggle Read More**
  const toggleReadMore = (id) => {
    setExpandedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4">
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-[350px] mx-auto"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt="Blog"
                className="w-full h-40 object-cover rounded-md"
              />

              {/* Blog Title */}
              <h2 className="mt-3 text-lg font-semibold text-gray-800">{blog.title}</h2>

              {/* Category */}
              <p className="text-sm text-gray-600 mt-1">{blog.categoryName}</p>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2">
                {expandedBlogs[blog._id]
                  ? blog.description
                  : blog.description.slice(0, 100) + "... "}
                {blog.description.length > 100 && (
                  <button
                    className="text-blue-500 underline text-sm"
                    onClick={() => toggleReadMore(blog._id)}
                  >
                    {expandedBlogs[blog._id] ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>

              {/* Date */}
              <p className="text-xs text-gray-500 mt-2">
                {new Date(blog.createdAt).toLocaleString()}
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-3">
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>

                <button
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => navigate(`/comment/${blog._id}`)}
                >
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No blogs available</p>
      )}
    </div>
  );
};

export default MyBlogs;
