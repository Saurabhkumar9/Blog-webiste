const Blog = require("../models/Blog.model");
const handleErrors = require("../utils/handelError");
const cloudinary = require("../config/cloudinary");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const dotenv = require("dotenv");

const adminDeleteBlogs = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { adminId } = req.body;

    if (adminId !== process.env.adminId) {
      return next(
        handleErrors(403, "Unauthorized! Only admin can delete blogs.")
      );
    }

    const findBlog = await Blog.findById(id);

    if (!findBlog) {
      return next(handleErrors(404, "Blog not found"));
    }

    const userIdString = findBlog.userId.toString();

    const publicId = findBlog.imagePublicId;

    if (publicId) {
      const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);

      if (cloudinaryResponse.result !== "ok") {
        console.log("Error: Image not found in Cloudinary!");
      }
    }

    await Comment.deleteMany({ BlogId: id });

    await Like.deleteMany({ Blog: id });

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

module.exports = { adminDeleteBlogs };
