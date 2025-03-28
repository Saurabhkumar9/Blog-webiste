const Blog = require("../models/Blog.model");
const handleErrors = require("../utils/handelError");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const fs = require("fs");

// const createBlog = async (req, res, next) => {
//   try {
//     const { title, description, content, categoryName } = req.body;

//     if (!title || !description || !content) {
//       return next(handleErrors(400, "All fields are required"));
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image file is required!",
//       });
//     }
//     const userId = req.user.id;

//     const findUser = await User.findById(userId);
//     console.log(findUser);

//     const imageUrl = req.file.path;
//     const publicId = req.file.filename;

//     const newBlog = new Blog({
//       title,
//       description,
//       content,
//       categoryName,
//       image: imageUrl,
//       author: findUser.name,
//       imagePublicId: publicId,
//       userId: req.user.id,
//     });

//     await newBlog.save();

//     return res.status(201).json({
//       success: true,
//       message: "Blog added successfully!",
//       blog: newBlog,
//     });
//   } catch (error) {
//     console.error("Error adding blog:", error);
//     return next(
//       handleErrors(500, "Internal Server Error. Please try again later.")
//     );
//   }
// };

// show blogs

const createBlog = async (req, res, next) => {
  try {
    const { title, description, content, categoryName } = req.body;

    if (!title || !description || !content) {
      return next(handleErrors(400, "All fields are required"));
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required!",
      });
    }

    const userId = req.user.id;
    const findUser = await User.findById(userId);
    if (!findUser) {
      return next(handleErrors(404, "User not found"));
    }

    const newBlog = new Blog({
      title,
      description,
      content,
      categoryName,
      author: findUser.name,
      userId: req.user.id,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog added successfully! Image is uploading...",
      blog: newBlog,
    });

    setImmediate(async () => {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog_images",
        });

        newBlog.image = result.secure_url;
        newBlog.imagePublicId = result.public_id;
        await newBlog.save();

        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting local file:", err);
        });
      } catch (err) {
        console.error("Error in background image upload:", err);
      }
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    return next(
      handleErrors(500, "Internal Server Error. Please try again later.")
    );
  }
};

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

// const deleteBlogs = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const findBlog = await Blog.findById(id);

//     if (!findBlog) {
//       return next(handleErrors(404, "Blog not found"));
//     }
//     const userIdString = findBlog.userId.toString();

//     if (userIdString !== userId) {
//       return next(
//         handleErrors(403, "Unauthorized! You can only delete your own blog.")
//       );
//     }

//     const publicId = findBlog.imagePublicId;

//     const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);

//     if (cloudinaryResponse.result !== "ok") {
//       console.log("Error: Image not found in Cloudinary!");
//     }

//     await Blog.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Blog and its image deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     return next(handleErrors(500, "Internal Server Error"));
//   }
// };

const deleteBlogs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const findBlog = await Blog.findById(id);
    if (!findBlog) {
      return next(handleErrors(404, "Blog not found"));
    }

    if (findBlog.userId.toString() !== userId) {
      return next(
        handleErrors(403, "Unauthorized! You can only delete your own blog.")
      );
    }

    if (findBlog.imagePublicId) {
      const cloudinaryResponse = await cloudinary.uploader.destroy(
        findBlog.imagePublicId
      );
      if (cloudinaryResponse.result !== "ok") {
        console.log("Warning: Image might not exist in Cloudinary!");
      }
    }

    const deletedComments = await Comment.deleteMany({ BlogId: id });

    const deletedLikes = await Like.deleteMany({ Blog: id });

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog, its image, all comments, and likes deleted successfully.",
      deletedComments: deletedComments.deletedCount,
      deletedLikes: deletedLikes.deletedCount,
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
    return res.status(201).json({
      success: true,
      message: "blog search sucessfull",
      findBlog,
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
