import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from 'axios'
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const BASE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllBlogUser=async()=>{
  try {
    
    const response=await axios.get(`${BASE_API_URL}/api/user/show-all-user-blog`)
    
    if(response.data.success){
      setBlogs(response.data.showAllBlogs)
      
    }

  } catch (error) {
    // console.log(error.response.data)
  }
}

useEffect(()=>{
  fetchAllBlogUser()
},[])


  const removeBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
    
      {/* Latest Blogs Section */}
      <section className="mb-10">
        <h2 className="lg:text-2xl text:sm font-bold text-gray-700 mb-4">Latest Blogs</h2>
        <div className="flex flex-wrap -mx-4">
          {blogs.slice(0, 25).map((blog) => (
            <BlogCard key={blog.id} blog={blog}  />
          ))}
        </div>
      </section>

      {/* Popular Blogs Section */}
      {/* <section>
        <h2 className="lg:text-2xl text-sm font-bold text-gray-700 mb-4">Popular Blogs</h2>
        <div className="flex flex-wrap -mx-4">
          {blogs.slice(4, 8).map((blog) => (
            <BlogCard key={blog.id}  blog={blog} />
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Home;
