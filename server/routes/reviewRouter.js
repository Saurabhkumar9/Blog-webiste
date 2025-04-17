const express = require('express');
const authUser = require('../middlewares/authUser');
const { createReview } = require('../controllers/reviewController');
const { adminDeleteBlogs } = require('../controllers/adminController');

const reviewRouter = express.Router();

// Routes for reviews
reviewRouter.post('/add-review', authUser, createReview)

reviewRouter.delete('/admin-delete-blog/:id', adminDeleteBlogs)


module.exports = reviewRouter;