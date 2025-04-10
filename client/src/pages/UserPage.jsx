import React, { useEffect, useState } from "react";
import { FiUserPlus, FiUserCheck, FiSearch } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
const BASE_API_URL = import.meta.env.VITE_API_URL;

const UserPage = () => {
  
  const { sendToken } = useAuth();
  console.log(sendToken)
  const [search, setSearch] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]); // All users
  const [activeTab, setActiveTab] = useState("all");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/show/user`,
        {
          headers: { Authorization: `Bearer ${sendToken}` },
        }
      );
      setUsers(response.data.findUser);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    }
  };

  // Fetch following users (whom I follow)
  const fetchFollowing = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/fetch/follow`,
        {
          headers: { Authorization: `Bearer ${sendToken}` },
        }
      );
      const followingIds = response.data.showFollower.map(
        (follow) => follow.followingId
      );
      setFollowing(followingIds);
    } catch (error) {
      
    }
  };

  // Fetch followers (who follow me)
  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/following-user`,
        {
          headers: { Authorization: `Bearer ${sendToken}` },
        }
      );
      console.log("folling", response.data.followers);
      setFollowers(response.data.followers);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFollowing();
    fetchFollowers();
  }, []);

  // Handle follow action
  const handleFollow = async (userId) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/follow`,
        { followingId: userId },
        { headers: { Authorization: `Bearer ${sendToken}` } }
      );
      if (response.data.isFollowing) {
        setFollowing([...following, userId]);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error following user");
    }
  };

  // Handle unfollow action
  const handleUnfollow = async (userId) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/follow`,
        { followingId: userId },
        { headers: { Authorization: `Bearer ${sendToken}` } }
      );
      if (!response.data.isFollowing) {
        setFollowing(following.filter((id) => id !== userId));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error unfollowing user");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-4 w-full">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-2 py-1 rounded-md ${
            activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab("all")}
        >
          Users
        </button>
        <button
          className={` px-2 py-1 rounded-md ${
            activeTab === "following"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
        <button
          className={`px-2 py-1 rounded-md ${
            activeTab === "followers"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === "all" && (
        <div className="border border-gray-300 rounded-md p-3 max-h-[400px] overflow-y-auto">
          <h2 className="text-lg font-bold mb-3">Users</h2>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 bg-white shadow-md rounded-lg mb-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h4 className="text-lg font-semibold">{user.name}</h4>
                </div>

                {/* Follow/Unfollow Button */}
                {following.includes(user._id) ? (
                  <FiUserCheck
                    onClick={() => handleUnfollow(user._id)}
                    className="text-blue-500 text-2xl cursor-pointer"
                  />
                ) : (
                  <FiUserPlus
                    onClick={() => handleFollow(user._id)}
                    className="text-gray-500 text-2xl cursor-pointer"
                  />
                )}
              </div>
            ))}
        </div>
      )}

      {activeTab === "following" && (
        <div className="border border-gray-300 rounded-md p-3 max-h-[400px] overflow-y-auto">
          <h2 className="text-lg font-bold mb-3">Following</h2>
          {users
            .filter((user) => following.includes(user._id))
            .map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 bg-white shadow-md rounded-lg mb-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h4 className="text-lg font-semibold">{user.name}</h4>
                </div>

                {/* Unfollow Button */}
                <FiUserCheck
                  onClick={() => handleUnfollow(user._id)}
                  className="text-red-500 text-2xl cursor-pointer"
                />
              </div>
            ))}
        </div>
      )}

      {activeTab === "followers" && (
        <div className="border border-gray-300 rounded-md p-3 max-h-[400px] overflow-y-auto">
          <h2 className="text-lg font-bold mb-3">Followers</h2>
          {followers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-3 bg-white shadow-md rounded-lg mb-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h4 className="text-lg font-semibold">{user.name}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
