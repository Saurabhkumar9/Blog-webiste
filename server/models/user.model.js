const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: 5,
      trim: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please enter a valid email address",
      ],
      trim: true 
    },
    password: {
      type: String,
      required: true,
      minLenght: [6, "password must be at least 6 characters"],
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    avatarPublicId: {
      type: String,
    },
    otp:{
      type:String
    },
    isverify:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
