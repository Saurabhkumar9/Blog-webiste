const express = require('express');
const { createBlog, showBlog, deleteBlogs, showAllUserBlogs, findBlogDetails } = require('../controllers/blogCotroller');
const upload = require('../middlewares/multer');
const authUser = require('../middlewares/authUser');

const blogRouter = express.Router();

blogRouter.post('/create-blog',authUser, upload.single("image"), createBlog);

blogRouter.get('/show-blog',authUser, showBlog)
blogRouter.delete('/delete/:id',authUser, deleteBlogs)


blogRouter.get('/show-all-user-blog',showAllUserBlogs)
blogRouter.get('/find-single-blog/:id',findBlogDetails)


module.exports = blogRouter;
