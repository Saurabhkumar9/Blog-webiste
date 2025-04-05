// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       let response;

//       if (isForgotPassword) {
//         response = await axios.post(
//           "http://localhost:4000/api/user/password-reset",
//           {
//             email: data.email,
//             password: data.password,
//           }
//         );

//         if (response.data.success) {
//           reset();
//           toast.success(response.data.message);
//           setTimeout(() => {
//             setIsForgotPassword(false);
//           }, 1000);
//         } else {
//           toast.error(response.data.message || "Password reset failed");
//         }
//       } else if (isSignup) {
//         response = await axios.post("http://localhost:4000/api/user/register", {
//           name: data.name,
//           email: data.email,
//           password: data.password,
//         });
//         if (response.data.success) {
//           toast.success(response.data.message || "Signup Successful!");
//           reset();
//           setTimeout(() => {
//             setIsSignup(false);
//           }, 2000);
//         } else {
//           toast.error(response.data.message || "Signup Failed!");
//         }
//       } else {
//         response = await axios.post("http://localhost:4000/api/user/login", {
//           email: data.email,
//           password: data.password,
//         });
//         if (response.data.success) {
//           login(response.data.token); // Use the login function from AuthContext
//           toast.success(response.data.message || "Login Successful!");
//           reset();
//           setTimeout(() => {
//             navigate("/");
//           }, 2000);
//         } else {
//           toast.error(response.data.message || "Login Failed!");
//         }
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           {isForgotPassword
//             ? "Update Password"
//             : isSignup
//             ? "Sign Up"
//             : "Login"}
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Name Field (Only for Signup) */}
//           {isSignup && !isForgotPassword && (
//             <div className="mb-4">
//               <label className="block text-gray-600 text-sm mb-1">Name</label>
//               <input
//                 type="text"
//                 {...register("name", { required: isSignup })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
//                 placeholder="Enter your name"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">Name is required</p>
//               )}
//             </div>
//           )}

//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-1">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">Email is required</p>
//             )}
//           </div>

//           {/* Password Field */}
//           {!isForgotPassword && (
//             <div className="mb-4 relative">
//               <label className="block text-gray-600 text-sm mb-1">
//                 Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", { required: true })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 pr-10"
//                 placeholder="Enter your password"
//               />
//               {/* Show/Hide Password Button */}
//               <span
//                 className="absolute right-3 top-10 cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//               </span>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   Password is required
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Update Password Field (Only for Forgot Password) */}
//           {isForgotPassword && (
//             <div className="mb-4">
//               <label className="block text-gray-600 text-sm mb-1">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 {...register("password", { required: true })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
//                 placeholder="Enter new password"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   New password is required
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 rounded text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             {isForgotPassword
//               ? "Update Password"
//               : isSignup
//               ? "Sign Up"
//               : "Login"}
//           </button>
//         </form>

//         {/* Links */}
//         {!isForgotPassword && (
//           <p className="text-sm text-gray-600 mt-4 text-center">
//             {isSignup ? "Already have an account?" : "New user?"}{" "}
//             <span
//               className="text-blue-500 cursor-pointer hover:underline"
//               onClick={() => setIsSignup(!isSignup)}
//             >
//               {isSignup ? "Login" : "Sign Up"}
//             </span>
//           </p>
//         )}

//         {/* Forgot Password Link */}
//         {!isForgotPassword && !isSignup && (
//           <p
//             className="text-sm text-blue-500 mt-2 text-center cursor-pointer hover:underline"
//             onClick={() => setIsForgotPassword(true)}
//           >
//             Forgot Password?
//           </p>
//         )}

//         {/* Back to Login Link */}
//         {isForgotPassword && (
//           <p
//             className="text-sm text-gray-600 mt-4 text-center cursor-pointer hover:underline"
//             onClick={() => setIsForgotPassword(false)}
//           >
//             Back to Login
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response;

      if (isForgotPassword) {
        response = await axios.post(
          "http://localhost:4000/api/user/password-reset",
          {
            email: data.email,
            password: data.password,
          }
        );

        if (response.data.success) {
          reset();
          toast.success(response.data.message);
          setTimeout(() => {
            setIsForgotPassword(false);
          }, 1000);
        } else {
          toast.error(response.data.message || "Password reset failed");
        }
      } else if (isSignup && !isEmailSent) {
        // Signup API
        response = await axios.post("http://localhost:4000/api/user/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        if (response.data.success) {
          toast.success(response.data.message || "Email Sent. Please verify.");
          setIsEmailSent(true);
          setEmail(data.email); // Store email for verification
        } else {
          toast.error(response.data.message || "Signup Failed!");
        }
      } else if (isSignup && isEmailSent) {
        // Email verification API
        response = await axios.post("http://localhost:4000/api/user/verify-email", {
          email,
          otp,
        });

        if (response.data.success) {

          toast.success("Email Verified! You can now login.");
          reset();
          setIsSignup(false);
          setIsEmailSent(false);
          setOtp("");
        } else {
          toast.error(response.data.message || "Invalid OTP");
        }
      } else {
        // Login API
        response = await axios.post("http://localhost:4000/api/user/login", {
          email: data.email,
          password: data.password,
        });

          
       
          login(response.data.token);
          toast.success(response.data.message)
          reset();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isForgotPassword
            ? "Update Password"
            : isSignup
            ? isEmailSent
              ? "Verify Email"
              : "Sign Up"
            : "Login"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field (Only for Signup) */}
          {isSignup && !isForgotPassword && !isEmailSent && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: isSignup })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>
          )}

          {/* Email Field */}
          {!isEmailSent && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>
          )}

          {/* Password Field */}
          {!isForgotPassword && !isEmailSent && (
            <div className="mb-4 relative">
              <label className="block text-gray-600 text-sm mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 pr-10"
                placeholder="Enter your password"
              />
              {/* Show/Hide Password Button */}
              <span
                className="absolute right-3 top-10 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>
          )}

          {/* OTP Field (Only for Email Verification) */}
          {isEmailSent && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
                placeholder="Enter OTP"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isForgotPassword
              ? "Update Password"
              : isSignup
              ? isEmailSent
                ? "Verify Email"
                : "Sign Up"
              : "Login"}
          </button>
        </form>

        {/* Links */}
        {!isForgotPassword && (
          <p className="text-sm text-gray-600 mt-4 text-center">
            {isSignup ? "Already have an account?" : "New user?"}{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => {
                setIsSignup(!isSignup);
                setIsEmailSent(false);
                setOtp("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
