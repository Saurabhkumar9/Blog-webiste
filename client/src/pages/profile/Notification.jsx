import React, { useState } from "react";

const Notification = () => {
  // ✅ लॉगिन किया हुआ यूज़र
  const loggedInUser = "Rahul Sharma"; // Example Logged-in User

  // ✅ यूज़र की फॉलो लिस्ट
  const followingAuthors = ["John Doe", "Alice Smith"];

  // ✅ यूज़र के लाइक किए हुए ब्लॉग्स
  const likedBlogs = [2, 4]; // IDs of liked blogs

  // ✅ Sample Blog Data
  const allBlogs = [
    {
      id: 1,
      title: "React Best Practices",
      author: "John Doe",
      category: "Web Development",
      description: "Learn the best practices to write clean React code.",
      date: "March 5, 2025",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "AI in Education",
      author: "Alice Smith",
      category: "Artificial Intelligence",
      description: "How AI is transforming the education sector.",
      date: "March 1, 2025",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      author: "Robert Brown",
      category: "Web Development",
      description: "Explore the new features introduced in ES6.",
      date: "March 10, 2025",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Future of AI",
      author: "Alice Smith",
      category: "Artificial Intelligence",
      description: "What the future holds for AI and machine learning.",
      date: "March 12, 2025",
      image: "https://via.placeholder.com/150",
    },
  ];

  // 🔍 फ़िल्टर करें फॉलो किए गए Authors के नए ब्लॉग्स
  const followingNotifications = allBlogs.filter((blog) =>
    followingAuthors.includes(blog.author)
  );

  // 🔍 फ़िल्टर करें यूज़र द्वारा लाइक किए गए ब्लॉग्स के अपडेट्स
  const likedBlogNotifications = allBlogs.filter((blog) =>
    likedBlogs.includes(blog.id)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Notifications</h1>
      
      {/* 📢 Followed Authors' New Blogs */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">New Blogs from Followed Authors</h2>
        {followingNotifications.length > 0 ? (
          followingNotifications.map((blog) => (
            <div key={blog.id} className="p-4 border rounded-md mb-2 bg-gray-100">
              <p className="font-bold">{blog.author} posted a new blog:</p>
              <p>{blog.title}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No new blogs from followed authors.</p>
        )}
      </div>

      {/* ❤️ Liked Blog Updates */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Updates on Your Liked Blogs</h2>
        {likedBlogNotifications.length > 0 ? (
          likedBlogNotifications.map((blog) => (
            <div key={blog.id} className="p-4 border rounded-md mb-2 bg-gray-100">
              <p className="font-bold">{blog.title} has new updates!</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No updates on your liked blogs.</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
