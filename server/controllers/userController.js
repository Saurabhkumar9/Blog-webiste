const handleErrors = require("../utils/handelError");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const nodemailer=require('nodemailer')
const crypto = require("crypto");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(handleErrors(400, "Please provide name, email, and password"));
    }

    const existingUser = await User.findOne({ email });

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
     
      if (existingUser.isverify) {
        return next(handleErrors(400, "Email already registered. Please login."));
      } else {
        
        existingUser.name = name;
        existingUser.password = hashPassword;
        existingUser.otp = otp;
        await existingUser.save();
      }
    } else {
      
      await User.create({
        name,
        email,
        password: hashPassword,
        isverify: false,
        otp,
      });
    }

    
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP is: ${otp}`,
    });

    res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete registration.",
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    return next(handleErrors(500, "Internal server error"));
  }
};


const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found!" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP!" });

    user.isverify = true;
    user.otp = null;
    await user.save();

    res.json({ success: true, message: "Email Verified Successfully!" });
  } catch (error) {
    console.log("verifyEmail error:", error);
    return next(handleErrors(500, "Internal server error"));
  }
};


const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(handleErrors(400, "Please provide email and password"));
    }

    const user = await User.findOne({ email });
    if (!user || !user.isverify) {
      return next(handleErrors(400, "Invalid email or please verify your email first"));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return next(handleErrors(400, "Invalid email or password"));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_key,
      { expiresIn: "2y" }
    );

    res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
    });
  } catch (error) {
    return next(handleErrors(500, "Internal server error"));
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





const sendResetOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(handleErrors(400, "Please provide an email"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(handleErrors(404, "User not found"));
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
  

    // Save OTP to user
    user.otp = otp;
    await user.save();

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Your Password",
      text: `Your OTP to reset password is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    return next(handleErrors(500, "Internal Server Error"));
  }
};


const resetPasswordWithOTP = async (req, res, next) => {
  try {
    const { email, otp, Password } = req.body;

    if (!email || !otp || !Password) {
      return next(handleErrors(400, "Please provide email, otp and new password"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(handleErrors(404, "User not found"));
    }

    if (user.otp !== (otp)) {
      return next(handleErrors(400, "Invalid OTP"));
    }

    const hashPassword = await bcrypt.hash(Password, 10);
    user.password = hashPassword;
    user.otp = null; // clear OTP
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return next(handleErrors(500, "Internal Server Error"));
  }
};






const updateProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide name and bio." });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let imageUrl = user.avatar;
    let publicId = user.avatarPublicId;

    if (req.file) {
      
      if (user.avatarPublicId) {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      }

      imageUrl = req.file.path; 
      publicId = req.file.filename; 
    }

    user.name = name;
    if (bio) {
      user.bio = bio;
    }
    user.avatar = imageUrl;
    user.avatarPublicId = publicId;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  registerUser,
  userLogin,
  resetPasswordWithOTP,
  updateProfile,
  showProfile,
  showAllUser,
  verifyEmail,
  sendResetOTP
};
