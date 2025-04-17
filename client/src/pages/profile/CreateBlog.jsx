import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_API_URL = import.meta.env.VITE_API_URL;

const CreateBlog = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const { sendToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // ✅ Disable button
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("categoryName", data.categoryName);
    formData.append("description", data.description);
    formData.append("content", data.content);

    // Check if image is provided and append if present
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/create-blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sendToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
      } else {
        toast.error("Failed to create blog!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // ✅ Enable button again
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/category-show`, {
        headers: {
          Authorization: `Bearer ${sendToken}`,
        },
      });

      if (response.data.success) {
        setCategory(response.data.existCategory);
      }
    } catch (error) {
      // toast.error(
      //   error.response?.data?.message || "Error fetching categories!"
      // );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-2 sm:mb-4">
          Express Your Ideas
        </h2>
        <p className="text-10px sm:text-base text-red-600 text-center mb-4">
          First create your category before writing a blog
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
          encType="multipart/form-data"
        >
          {/* Blog Title */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Blog Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required", minLength: {
                value: 8,
                message: "Content must be at least 8 characters long"
              } })}
              className="w-full p-2 sm:p-3 border border-gray-300 bg-white rounded-md text-gray-700 text-sm sm:text-base"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm sm:text-base">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Blog Category */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Blog Category
            </label>
            <select
              {...register("categoryName", {
                required: "Please select a category",
              })}
              className="w-full p-2 sm:p-3 border border-gray-300 bg-white rounded-md text-gray-700 text-sm sm:text-base"
            >
              <option value="">Select a category</option>
              {category.map((cat, index) => (
                <option value={cat.categoryName} key={index}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryName && (
              <p className="text-red-500 text-sm sm:text-base">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          {/* Blog description */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Short description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required", minLength: {
                  value: 14,
                  message: "Content must be at least 14 characters long"
                }
              })}
              className="w-full p-2 sm:p-3 border border-gray-300 bg-white rounded-md text-gray-700 text-sm sm:text-base"
              rows="3"
              placeholder="Enter a short description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm sm:text-base">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Detailed Content
            </label>
            <textarea
              {...register("content", { required: "Content is required", minLength: {
                value: 20,
                message: "Content must be at least 30 characters long"
              } })}
              className="w-full p-2 sm:p-3 border border-gray-300 bg-white rounded-md text-gray-700 text-sm sm:text-base"
              rows="6"
              placeholder="Write your blog details here..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm sm:text-base">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Upload Image (Optional) */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Upload Blog Image
            </label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              className="w-full p-2 sm:p-3 border border-gray-300 bg-white rounded-md text-gray-700 text-sm sm:text-base"
              onChange={(e) => console.log("Selected File:", e.target.files[0])}
            />
            {errors.image && (
              <p className="text-red-500 text-sm sm:text-base">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // ✅ Disable when loading
            className={`w-full p-2 sm:p-3 rounded-md text-sm sm:text-base transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit Blog"} {/* ✅ Dynamic text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
