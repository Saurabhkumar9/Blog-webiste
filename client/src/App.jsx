import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AddblogCategory from "./pages/profile/AddblogCategory";
import CreateBlog from "./pages/profile/CreateBlog";
import MyBlogs from "./pages/profile/MyBlogs";
import Comments from "./pages/Comments";
import AllBlogs from "./pages/AllBlogs";
import FollowingBlogs from "./pages/profile/FollowingBlogs";
import Notification from "./pages/profile/Notification";
import DeatilsBlog from "./pages/DeatilsBlog";
import Login from "./pages/Login";
import Profile from "./pages/profile/Profile";
import UserPage from "./pages/UserPage";
import About from './pages/About'

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />

      <Navbar />

      <div className="flex w-full flex-col lg:flex-row">
        {/* Sidebar (Hidden on small screens, visible on lg screens) */}
        <div className="w-full lg:w-1/4 p-4  hidden lg:block">
          <Sidebar />
        </div>

        {/* Content Area (Full width on small screens, 3/4 on lg screens) */}
        <div className="w-full lg:w-3/4  sm:p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-blogs" element={<AllBlogs />} />
            <Route path="/following" element={<FollowingBlogs />} />
            <Route path="/create-blog-category" element={<AddblogCategory />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/your-blogs" element={<MyBlogs />} />
            <Route path="/comment/:id" element={<Comments />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/blogs/details/:id" element={<DeatilsBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<UserPage/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </div>

      
    </>
  );
};

export default App;
