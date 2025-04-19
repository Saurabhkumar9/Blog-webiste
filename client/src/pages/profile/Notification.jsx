import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const BASE_API_URL = import.meta.env.VITE_API_URL;

const Notification = () => {
  const { sendToken } = useAuth();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const newReview = { rating: rating, comment: data.review };

    try {
      const response = await axios.post(
        `${BASE_API_URL}/api/user/add-review`,
        newReview,
        {
          headers: {
            Authorization: `Bearer ${sendToken}`,
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message)
        setSubmitted(true);
        reset();
        setRating(0);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      alert(error.response?.data?.message || "some thing went wrong");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Notifications</h1>

      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-8">
        <h2 className="font-bold text-lg mb-2">Feature Coming Soon!</h2>
        <p>We're currently working on an enhanced notification system:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>New blogs from authors you follow</li>
          <li>Updates on blogs you've liked</li>
          <li>Comments on your posts</li>
          <li>Personalized recommendations</li>
        </ul>
        <p className="mt-2">Stay tuned for this exciting update!</p>
      </div>

      {/* Review Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Star Rating */}
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-gray-600">
              {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : ""}
            </span>
          </div>

          {/* Review Input */}
          <div className="mb-4">
            <label htmlFor="review" className="block mb-2 font-medium">
              Your Feedback
            </label>
            <textarea
              id="review"
              {...register("review", { required: true })}
              rows="4"
              className="w-full p-2 border rounded mb-4 bg-white text-black"
              placeholder="What features would you like to see in notifications?"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={rating === 0}
          >
            Submit Review
          </button>

          {/* Submission Message */}
          {submitted && (
            <p className="mt-2 text-green-600">Thank you for your feedback!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Notification;
