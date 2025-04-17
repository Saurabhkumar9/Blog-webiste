import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaUserPlus,
  FaUserCheck,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const BASE_API_URL = import.meta.env.VITE_API_URL;

const DetailsBlog = () => {
  const { id } = useParams();
  const { sendToken, user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState([]);
  const [comments, setComments] = useState([]);
  const [details, setDetails] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/like`,
        { BlogId: id },
        { headers: { Authorization: `Bearer ${sendToken}` } }
      );
      if (response.data.success) {
        setLiked(response.data.liked);
        setLikeCount(response.data.likeCount || 0);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/comment-add`,
        { comment: data.comment, BlogId: id },
        { headers: { Authorization: `Bearer ${sendToken}` } }
      );
      if (response.data.success) showDetails();
      reset();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const showDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/find-single-blog/${id}`,
        { headers: { Authorization: `Bearer ${sendToken}` } }
      );
      if (response.data.success) {
        setDetails(response.data.findBlog);
        setComments(response.data.findBlog.comments);
        setLikeCount(response.data.findBlog.likes);
        setIsFollowing(response.data.isFollowing);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    showDetails();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/user/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${sendToken}` } }
      );
      if (response.data.success) {
        setComments(prev => prev.filter(comment => comment._id !== commentId));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/follow`,
        { followingId: details.userId },
        { headers: { Authorization: `Bearer ${sendToken}` } }
      );
      
        setIsFollowing(response.data.isFollowing);
       
    } catch (error) {
      toast.error(error.response?.data?.message || "Error following user");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {/* Blog Image */}
      <div className="w-full h-64 overflow-hidden rounded-md">
        <img
          src={details.image  || logo}
          alt="Blog Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Follow Button (Below Image) */}
      {user?.id !== details.userId && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              isFollowing
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } transition-colors`}
          >
            {isFollowing ? (
              <>
                <FaUserCheck /> Following
              </>
            ) : (
              <>
                <FaUserPlus /> Follow
              </>
            )}
          </button>
        </div>
      )}

      {/* Blog Content */}
      <h1 className="text-2xl font-bold mt-4">{details.title}</h1>
      <p className="text-sm text-gray-500">
        <strong className="text-black text-xl">Category:</strong> {details.categoryName}
      </p>
      <p className="text-sm text-red-500">
        <strong className="text-black text-xl">Description:</strong> {details.description}
      </p>
      <p className="mt-4 text-gray-700">{details.content}</p>

      {/* Author Info */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <strong className="text-black text-xl">Created by:</strong>{" "}
          <span className="font-semibold">{details.author}</span>
        </p>
        <p className="text-sm text-gray-600">
          <strong className="text-black">Created Date:</strong>{" "}
          <span className="font-semibold">
            {new Date(details.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>

      {/* Interactions */}
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600"
        >
          {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          <span>{likeCount.length} Likes</span>
        </button>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaComment size={18} />
          <span>{comments.length} Comments</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Comments</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <input
            type="text"
            {...register("comment", { required: "Comment cannot be empty!" })}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
          <button
            type="submit"
            className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Comment
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2 border p-2 rounded-lg">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border-b py-2 flex flex-col lg:flex-row justify-between"
            >
              <div className="w-full lg:w-[70%]">
                <p className="text-gray-700">{comment.comment}</p>
              </div>
              <div className="relative p-4 border rounded-md bg-white shadow-md">
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm font-semibold">{comment.userName}</p>
                <MdDelete
                  className="absolute bottom-2 right-2 text-red-500 cursor-pointer hover:text-red-700 transition text-3xl lg:text-2xl"
                  onClick={() => handleDeleteComment(comment._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No comments yet. Be the first one to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsBlog;
