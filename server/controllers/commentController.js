const handleErrors = require("../utils/handelError");
const Blog = require("../models/Blog.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

const addComment = async (req, res, next) => {
  try {
    const { comment, BlogId } = req.body;
    const userId = req.user.id;
    if (!comment) {
      return next(handleErrors(400, "Comment is required"));
    }
    if (!BlogId) {
      return next(handleErrors(400, "Blog ID is required"));
    }

    const blogExists = await Blog.findById(BlogId);
    if (!blogExists) {
      return next(handleErrors(404, "Blog not found"));
    }
    const findUser = await User.findById(userId);

    const newComment = new Comment({
      comment,
      BlogId,
      userId,
      userName: findUser.name,
    });

    await newComment.save();

    blogExists.comments.push(newComment._id);
    await blogExists.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return next(handleErrors(500, "Internal server error"));
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    if (!commentId) {
      return next(handleErrors(400, "Comment ID is required"));
    }

    // Check if comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(handleErrors(404, "Comment not found"));
    }

    if (comment.userId.toString() !== userId) {
      return next(handleErrors(403, "You can only delete your own comments"));
    }

    await Blog.findByIdAndUpdate(comment.BlogId, {
      $pull: { comments: commentId },
    });

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return next(handleErrors(500, "Internal server error"));
  }
};

module.exports = { addComment, deleteComment };
