import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const BASE_API_URL = import.meta.env.VITE_API_URL;

const AllBlogs = () => {
 

  const [allBlogs, setAllBlogs] = useState([]); 
  const [category, setCategory] = useState("All");

  const fetchAllBlogUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/show-all-user-blog`);
      if (response.data.success) {
        setAllBlogs(response.data.showAllBlogs);
      }
      
    } catch (error) {
      // console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchAllBlogUser();
  }, []);

  
  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Education" },
    { id: 2, name: "Entertainment" },
    { id: 3, name: "Sports" },
    { id: 4, name: "Technology" },
    { id: 5, name: "Health & Fitness" },
    { id: 6, name: "Travel" },
    { id: 7, name: "Lifestyle" },
    { id: 8, name: "Food" },
    { id: 9, name: "Business & Finance" },
    { id: 10, name: "Science & Innovation" },
    { id: 11, name: "Politics & Current Affairs" },
  ];

  const filteredBlogs =
    category === "All"
      ? allBlogs
      : allBlogs.filter((blog) => blog.categoryName === category);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-6">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name} className="text-black">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap -mx-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center w-full text-gray-600">
            No blogs found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;