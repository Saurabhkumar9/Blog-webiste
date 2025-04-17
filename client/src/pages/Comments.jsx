import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_API_URL = import.meta.env.VITE_API_URL;
const Comments = () => {
  const { sendToken } = useAuth()
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const showDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/find-single-blog/${id}`,{headers: {
          Authorization: `Bearer ${sendToken}`,
        },
    });
      console.log(response.data);
      if (response.data.success) {
        setComments(response.data.findBlog.comments);
      }
    } catch (error) {
      // console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    showDetails();
  }, []);

  return (
    <div className="p-4">
      {comments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Commenter Name */}
              <h3 className="font-semibold text-gray-800 text-sm border-b pb-1">
                {comment.userName}
              </h3>

              {/* Comment Content */}
              <p className="text-sm text-gray-700 mt-2 font-medium flex-1 break-words">
                "{comment.comment}"
              </p>

              {/* Date */}
              <p className="text-xs text-gray-500 mt-2 text-right">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No comments available</p>
      )}
    </div>
  );
};

export default Comments;
