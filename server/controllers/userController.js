const handleErrors = require("../utils/handelError");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");




const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(
        handleErrors(400, "Please provide name, email, and password")
      );
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return next(handleErrors(400, "Email already exists"));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    delete newUser.password;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      name: name,
      email: email,
    });
  } catch (error) {
    return next(handleErrors(500, "Internal server error"));
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(handleErrors(400, "Please provide email and password"));
    }
    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return next(handleErrors(400, "Invalid email "));
    }
    const isPasswordMatch = await bcrypt.compare(password, existEmail.password);
    if (!isPasswordMatch) {
      return next(handleErrors(400, "Invalid password not match"));
    }

    const Key = process.env.JWT_key;
    const payload = {
      id: existEmail._id,
      email: existEmail.email,
    };
    const token = jwt.sign({ payload }, Key, { expiresIn: "2d" });

    res.status(201).json({
      success: true,
      message: "user login successfully",
      token: token,
    });
  } catch (error) {
    return next(handleErrors(500, "Internal server error"));
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(handleErrors(400, "Please provide email and password"));
    }

    const exist = await User.findOne({ email });
    if (!exist) {
      return next(handleErrors(400, "Invalid email"));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return next(handleErrors(500, "Internal Server Error"));
  }
};

const showProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(handleErrors(404, "User not found"));
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(handleErrors(500, "Internal Server Error"));
  }
};




// const updateProfile = async (req, res, next) => {
//   try {
//     const { name, bio } = req.body;

//     if (!name) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please provide name and bio." });
//     }

//     const userId = req.user.id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     let imageUrl = user.avatar;
//     let publicId = user.avatarPublicId;
//     // console.log(publicId);

//     if (req.file) {
//       if (user.avatarPublicId) {
//         await cloudinary.uploader.destroy(user.avatarPublicId);
//       }

//       imageUrl = req.file.path;
//       publicId = req.file.filename;
//     }

//     user.name = name;
//     if(bio){
//       user.bio = bio;
//     }
//     user.avatar = imageUrl;
//     user.avatarPublicId = publicId;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: {
//         name: user.name,
//         bio: user.bio,
//         avatar: user.avatar,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };



const updateProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and bio.",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let imageUrl = user.avatar;
    // let publicId = user.avatarPublicId;

   
    user.name = name;
    if (bio) {
      user.bio = bio;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        name: user.name,
        bio: user.bio,
        avatar: imageUrl,
      },
    });

    
    if (req.file) {
      setImmediate(async () => {
        try {
         
          if (user.avatarPublicId) {
            await cloudinary.uploader.destroy(user.avatarPublicId);
          }

          
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "user_uploads",
          });

          
          user.avatar = result.secure_url;
          user.avatarPublicId = result.public_id;
          await user.save();

          
          fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting local file:", err);
          });
        } catch (err) {
          console.error("Error in background image upload:", err);
        }
      });
    }
  } catch (error) {
    next(error);
  }
};





const showAllUser=async(req,res,next)=>{


  try {
    
    const findUser=await User.find().select('-password')
    return res.status(201).json({
      success:true,
      findUser
    })

  } catch (error) {
    return next(handleErrors(404, "User not found"));
  }

}


module.exports = {
  registerUser,
  userLogin,
  updatePassword,
  updateProfile,
  showProfile,
  showAllUser
};
