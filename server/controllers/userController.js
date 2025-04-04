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
      // अगर user verified है, तो error भेजो
      if (existingUser.isverify) {
        return next(handleErrors(400, "Email already registered. Please login."));
      } else {
        // अगर user verified नहीं है, तो OTP update कर दो और resend करो
        existingUser.name = name;
        existingUser.password = hashPassword;
        existingUser.otp = otp;
        await existingUser.save();
      }
    } else {
      // नया user create करो
      await User.create({
        name,
        email,
        password: hashPassword,
        isverify: false,
        otp,
      });
    }

    // Mail भेजो
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
      { expiresIn: "90d" }
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
  showAllUser,
  verifyEmail
};
