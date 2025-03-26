// import React, { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const Profile = () => {
//   const [nameUser, setNameUser] = useState("");
//   const [avatar, setAvatar] = useState("/default-avatar.png");
//   const fileInputRef = useRef(null);
//   const [userData, setUserData] = useState({});
//   const token = localStorage.getItem("token");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const { setIconUrl } = useAuth();
//   const[follower,setfollower]=useState([])
//   const[following,setfollowing]=useState([])


//   const { register, handleSubmit, setValue, reset } = useForm({
//     defaultValues: {
//       name: nameUser,
//     },
//   });

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("bio", data.bio);

//     if (selectedFile) {
//       formData.append("avatar", selectedFile);
//     }

//     try {
//       const response = await axios.put(
//         "http://localhost:4000/api/user/profile/update",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data.success) {
//         reset();
//         toast.success(response.data.message);
//         setAvatar(response.data.data.avatar || "/default-avatar.png");
       
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   const getUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/user/show/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
     

//       if(response.data.success){
//         console.log(response.data);
//         setUserData(response.data.user);
//         setNameUser(response.data.user.name);
//         setIconUrl(response.data.user.avatar);
//         setAvatar(response.data.user.avatar || "/default-avatar.png");
//         setfollower(response.data.user.followers)
//         setfollowing(response.data.user.following)
//       }

//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch user data");
//       // console.log(error.response.data.message)
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, [avatar,userData]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setAvatar(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
//       <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-6 md:gap-8">
//         {/* **Profile Image Section** */}
//         <div className="w-full md:w-1/3 flex flex-col items-center gap-6">
//           <div className="relative w-32 h-32">
//             {avatar && (
//               <img
//                 src={avatar}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
//               />
//             )}
//           </div>

//           {/* User Info Section */}
//           <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
//             <div className="flex flex-col items-center text-center">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {userData.name}
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">{userData.bio}</p>
//             </div>

//             {/* Followers & Following Section */}
//             <div className="mt-4 flex justify-center space-x-6">
//               <div className="text-center">
               
//                 <p className="text-sm text-gray-600"><strong>Followers:</strong>{follower.length}  </p>
//               </div>
//               <div className="text-center">
                
//                 <p className="text-sm text-gray-600"><strong>Following:</strong>{following.length}  </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* **Profile Edit Form** */}
//         <div className="w-full md:w-2/3">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             Edit Profile
//           </h3>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* **Name Input** */}
//             <div>
//               <label className="block text-sm text-gray-700 font-medium mb-1">
//                 Name
//               </label>
//               <input
//                 value={nameUser}
//                 readOnly
//                 {...register("name", { required: true })}
//                 className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white text-sm"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             {/* **Bio Input** */}
//             <div>
//               <label className="block text-sm text-gray-700 font-medium mb-1">
//                 Bio
//               </label>
//               <textarea
//                 {...register("bio")}
//                 className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white text-sm"
//                 rows="4"
//                 placeholder="Tell us about yourself"
//               ></textarea>
//             </div>

//             {/* **Image Upload Input** */}
//             <div>
//               <label className="block text-sm text-gray-700 font-medium mb-1">
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white text-sm"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>

//             {/* **Submit Button** */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 text-base font-medium rounded-md hover:bg-blue-700 transition duration-300 mt-4"
//             >
//               Save Changes
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");
  const [selectedFile, setSelectedFile] = useState(null);
  const { setIconUrl } = useAuth();
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      const response = await axios.put(
        "http://localhost:4000/api/user/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Instead of reset(), update the form with new values
       
        toast.success(response.data.message);
        setAvatar(response.data.data.avatar || "/default-avatar.png");
        setIconUrl(response.data.data.avatar || "/default-avatar.png");
        
        getUser();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/show/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.user);
        setValue("name", response.data.user.name);
        setValue(response.data.user.bio || "");
        setIconUrl(response.data.user.avatar);
        setAvatar(response.data.user.avatar || "/default-avatar.png");
        setFollower(response.data.user.followers);
        setFollowing(response.data.user.following);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUser();
  }, [userData,avatar]); 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleProfileClick = () => {
    console.log("User Profile Clicked!", userData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Profile Image Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center gap-6">
          <div className="relative w-32 h-32" onClick={handleProfileClick}>
            {avatar && (
              <img
                src={avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
              />
            )}
          </div>

          {/* User Info Section */}
          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {userData.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{userData.bio}</p>
            </div>

            {/* Followers & Following Section */}
            <div className="mt-4 flex justify-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <strong>Followers:</strong> {follower.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <strong>Following:</strong> {following.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Edit Profile
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-gray-100 text-sm"
                placeholder="Enter your name"
                required
                disabled
              />
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Bio
              </label>
              <textarea
                {...register("bio")}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white text-sm"
                rows="4"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Image Upload Input */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Profile Image
              </label>
              <input
                type="file"
                ref={fileInputRef}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white text-sm"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-2 text-base font-medium rounded-md hover:bg-blue-700 transition duration-300 mt-4 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;