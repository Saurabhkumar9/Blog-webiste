import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let response;

      if (isForgotPassword && !isEmailSent) {
        response = await axios.post(`${BASE_API_URL}/api/user/send-reset-otp`, {
          email: data.email,
        });

        if (response.data.success) {
          toast.success("OTP sent to your email.");
          setIsEmailSent(true);
          setEmail(data.email);
        } else {
          toast.error(response.data.message || "Failed to send OTP.");
        }
      } else if (isForgotPassword && isEmailSent) {
        response = await axios.post(`${BASE_API_URL}/api/user/password-reset`, {
          email,
          otp,
          Password: newPassword,
        });

        if (response.data.success) {
          toast.success(
            response.data.message || "Password reset successfully."
          );
          reset();
          setIsForgotPassword(false);
          setIsEmailSent(false);
          setOtp("");
          setNewPassword("");
        } else {
          toast.error(response.data.message || "Invalid OTP or reset failed.");
        }
      } else if (isSignup && !isEmailSent) {
        response = await axios.post(`${BASE_API_URL}/api/user/register`, {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        if (response.data.success) {
          toast.success("Email sent. Please verify.");
          setIsEmailSent(true);
          setEmail(data.email);
        } else {
          toast.error(response.data.message || "Signup failed.");
        }
      } else if (isSignup && isEmailSent) {
        response = await axios.post(`${BASE_API_URL}/api/user/verify-email`, {
          email,
          otp,
        });

        if (response.data.success) {
          toast.success("Email verified! You can now login.");
          reset();
          setIsSignup(false);
          setIsEmailSent(false);
          setOtp("");
        } else {
          toast.error(response.data.message || "Invalid OTP");
        }
      } else {
        response = await axios.post(`${BASE_API_URL}/api/user/login`, {
          email: data.email,
          password: data.password,
        });

        login(response.data.token);
        toast.success("Login successful!");
        reset();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isForgotPassword
            ? isEmailSent
              ? "Verify OTP & Set Password"
              : "Forgot Password"
            : isSignup
            ? isEmailSent
              ? "Verify Email"
              : "Sign Up"
            : "Login"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          {isSignup && !isEmailSent && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-700"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>
          )}

          {/* Email */}
          {(!isEmailSent || isForgotPassword) && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-700"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
          )}

          {/* Password */}
          {!isEmailSent && !isForgotPassword && (
            <div className="mb-4 relative">
              <label className="block text-gray-600 text-sm mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-700 pr-10"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>
          )}

          {/* OTP */}
          {isEmailSent && (
            <div className="mb-4">
              <p className="text-red-600 mt-4 text-center text-sm">
                Please check your <span className="underline">Spam</span> folder
                if you don’t find the OTP in your inbox.
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-700"
              />
            </div>
          )}

          {/* New Password for Forgot Password */}
          {isForgotPassword && isEmailSent && (
            <div className="mb-4 relative">
              <label className="block text-gray-600 text-sm mb-1">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-700 pr-10"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded text-white font-semibold ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading
              ? "Please wait..."
              : isForgotPassword
              ? isEmailSent
                ? "Reset Password"
                : "Send OTP"
              : isSignup
              ? isEmailSent
                ? "Verify Email"
                : "Sign Up"
              : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-sm text-center text-gray-600">
          {!isForgotPassword && (
            <p>
              {isSignup ? "Already have an account?" : "New user?"}{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setIsEmailSent(false);
                  setOtp("");
                  reset();
                }}
              >
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          )}

          {!isSignup && !isForgotPassword && (
            <p className="mt-2">
              Forgot password?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setIsForgotPassword(true);
                  setIsSignup(false);
                  setIsEmailSent(false);
                  setOtp("");
                  reset();
                }}
              >
                Reset
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
