import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";
import axios from 'axios'
const FollowingBlogs = () => {
  
  const  [allBlogs,setAllBlogs]=useState([])
  const sendToken=localStorage.getItem('token')
  // console.log(sendToken)
  const fetchBlogsUser=async()=>{
    const response=await axios.get('http://localhost:4000/api/user/follow-user-blog',
      {
        headers: {
          Authorization: `Bearer ${sendToken}`,
        },
      }
    )
    console.log(response.data)
    setAllBlogs(response.data.blogs)
  }
useEffect(()=>{
  fetchBlogsUser()
},[])
 
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Following Blogs</h1>

      {/* Show Blogs */}
      <div className="flex flex-wrap -mx-4">
        {allBlogs.length > 0 ? (
          allBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center w-full text-gray-600">
            You are not following any authors yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default FollowingBlogs;
