import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const AddblogCategory = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [slug, setSlug] = useState("");
  const { sendToken } = useAuth();
  const [categories, setCategories] = useState([]); // State to store fetched categories

  const blogCategories = [
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

  const selectedCategory = watch("categoryName");

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/category-show",
        {
          headers: {
            Authorization: `Bearer ${sendToken}`,
          },
        }
      );

      if (response.data.success) {
        setCategories(response.data.existCategory);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching categories!"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setSlug(slugify(selectedCategory, { lower: true, strict: true }));
    }
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    const info = {
      categoryName: data.categoryName,
      slug: slug,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/category-add",
        info,
        {
          headers: {
            Authorization: `Bearer ${sendToken}`,
          },
        }
      );
      if (response.data.success) {
        reset({ categoryName: "" });
        setSlug("");
        toast.success(response.data.message);
        fetchCategories(); 
      }
    } catch (error) {
      toast.error(error.response.data.message);
      reset({ categoryName: "" });
      setSlug("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Add Blog Category Form */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
            Add Blog Category
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4"
          >
            {/* Category Selection */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Select Blog Category
              </label>
              <div className="relative">
                <select
                  {...register("categoryName", { required: true })}
                  className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 appearance-none bg-white text-sm sm:text-base"
                  required
                >
                  <option name="first" value="" disabled>
                    Select a category
                  </option>
                  {blogCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Display Slug */}
            <div className="mt-2">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Slug:
              </label>
              <input
                type="text"
                value={slug}
                name="slug"
                readOnly
                className="w-full p-2 sm:p-3 border rounded-md bg-gray-200 text-gray-700 font-semibold text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 sm:p-3 rounded-md hover:bg-blue-700 transition-all text-sm sm:text-base"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Display Existing Categories */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
            Existing Categories
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category._id}
                  className="p-3 sm:p-4 bg-gray-50 rounded-md shadow-sm"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                    {category.categoryName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Slug: {category.slug}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm sm:text-base text-gray-600 text-center">
                No categories found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddblogCategory;