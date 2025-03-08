const Category = require("../models/category.model");
const handleErrors = require("../utils/handelError");

const addCategory = async (req, res, next) => {
  try {
    const { categoryName, slug } = req.body;

    // Validate input
    if (!categoryName || !slug) {
      return next(handleErrors(404, "Provide both category and slug"));
    }

    const userId = req.user.id;

    // Check if the category already exists for the user
    const existCategory = await Category.findOne({ categoryName, userId });

    if (existCategory) {
      // If the category exists, delete it
      await Category.findByIdAndDelete(existCategory._id);
      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } else {
      
      const newCategory = new Category({
        categoryName,
        slug,
        userId,
      });
      await newCategory.save();
      return res.status(201).json({
        success: true,
        message: "Category added successfully",
      });
    }
  } catch (error) {
    next(error);
    return next(handleErrors(500, "Internal server error"));
  }
};







const showCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const existCategory = await Category.find({userId});

    if (existCategory.length === 0) {
      
      return next(
        handleErrors(404, "Category not found. First create your category")
      );
    }

    return res.status(201).json({
      success: true,
      message: "youe category",
      existCategory,
    });
  } catch (error) {
    return next(handleErrors(500, "internal server error"));
  }
};

module.exports = { addCategory, showCategory };
