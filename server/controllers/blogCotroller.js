const Blog = require("../models/Blog.model");
const Follow = require("../models/follow.model");
const handleErrors = require("../utils/handelError");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const fs = require("fs");



const createBlog = async (req, res, next) => {
  try {
    const { title, description, content, categoryName } = req.body;

    if (!title || !description || !content) {
      return next(handleErrors(400, "All fields are required"));
    }

    const userId = req.user.id;

    
    const findUser = await User.findById(userId);
    if (!findUser) {
      return next(handleErrors(404, "User not found"));
    }

    let imageUrl = null;
    let publicId = null;

   
    if (req.file) {
      // Assuming Cloudinary is configured and integrated
      imageUrl = req.file.path;  // Cloudinary image URL
      publicId = req.file.filename; // Cloudinary public ID (unique ID for the uploaded image)
    }

    // Create a new blog post
    const newBlog = new Blog({
      title,
      description,
      content,
      categoryName,
      image: imageUrl, // Save image URL only if provided
      author: findUser.name,
      imagePublicId: publicId, // Save image PublicId only if provided
      userId: req.user.id,
    });

    // Save the blog to the database
    await newBlog.save();

    // Return the response with success status and blog data
    return res.status(201).json({
      success: true,
      message: "Blog added successfully!",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    // Handle server errors
    return next(
      handleErrors(500, "Internal Server Error. Please try again later.")
    );
  }
};



// show blogs

const showBlog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const showBlog = await Blog.find({ userId }).sort({ createdAt: -1 });
    return res.status(201).json({
      success: true,
      showBlog,
    });
  } catch (error) {
    return next(
      handleErrors(500, "Internal Server Error. Please try again later.")
    );
  }
};


const deleteBlogs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const findBlog = await Blog.findById(id);

    if (!findBlog) {
      return next(handleErrors(404, "Blog not found"));
    }

    const userIdString = findBlog.userId.toString();

    if (userIdString !== userId) {
      return next(
        handleErrors(403, "Unauthorized! You can only delete your own blog.")
      );
    }

    const publicId = findBlog.imagePublicId;

    // If the blog has an associated image, delete it from Cloudinary
    if (publicId) {
      const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);

      if (cloudinaryResponse.result !== "ok") {
        console.log("Error: Image not found in Cloudinary!");
      }
    }

    // Delete all related comments for the blog
    await Comment.deleteMany({ BlogId: id });

    // Delete all related likes for the blog
    await Like.deleteMany({ Blog: id });

    // Finally, delete the blog
    await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog and its image, comments, and likes deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return next(handleErrors(500, "Internal Server Error"));
  }
};

const showAllUserBlogs = async (req, res, next) => {
  try {
    const showAllBlogs = await Blog.find().sort({ createdAt: -1 });
    if (!showAllBlogs) {
      return next(handleErrors(404, "blog not found"));
    }
    res.status(201).json({
      success: true,
      showAllBlogs,
    });
  } catch (error) {
    return next(handleErrors(500, "Internal Server Error"));
  }
};

const findBlogDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(handleErrors(404, "Blog id not exist"));
    }

    const findBlog = await Blog.findById(id)
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "likes",
      })
      .exec();

    if (!findBlog) {
      return next(handleErrors(404, "blog details not exist"));
    }

    const followRelation = await Follow.findOne({
      followerId: req.user.id,
      followingId: findBlog.userId,
    });
    let isFollowing = false;
    if (followRelation) {
      isFollowing = true;
    }

    return res.status(201).json({
      success: true,
      message: "blog search sucessfull",
      findBlog,
      isFollowing,
    });
  } catch (error) {
    return next(handleErrors(500, "Internal Server Error"));
  }
};

module.exports = {
  createBlog,
  showBlog,
  deleteBlogs,
  showAllUserBlogs,
  findBlogDetails,
};
