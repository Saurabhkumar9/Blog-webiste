const Review = require("../models/review.model");

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    console.log(rating,comment)

    if (!comment) {
      return res.status(409).json({ message: "please enter commnet" });
    }
    console.log(req.user.id)
    const newReview = new Review({
      userId: req.user.id,
      rating,
      comment,
    });

    await newReview.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "somthing went wrong try again.",
      error: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

module.exports = { createReview, getAllReviews };
