const handleErrors = require('../utils/handelError');
const Like = require('../models/like.model');
const Blog = require('../models/Blog.model');

const toggleLike = async (req, res, next) => {
    try {
        const { BlogId } = req.body;
        const userId = req.user.id; 

        if (!BlogId) {
            return next(handleErrors(400, 'Blog ID is required'));
        }

        const blog = await Blog.findById(BlogId);
        if (!blog) {
            return next(handleErrors(404, 'Blog not found'));
        }

        const existingLike = await Like.findOne({ user: userId, Blog: BlogId });


        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);
            blog.likes = blog.likes.filter(likeId => likeId.toString() !== existingLike._id.toString());
            await blog.save();

            return res.status(200).json({
                success: true,
                message: 'Like removed successfully',
                liked: false,
                likeCount: blog.likes.length  
            });
        } else {
            const newLike = new Like({ user: userId, Blog: BlogId });
            await newLike.save();

            blog.likes.push(newLike._id);
            await blog.save();

            return res.status(201).json({
                success: true,
                message: 'Blog liked successfully',
                liked: true,
                likeCount: blog.likes.length  
            });
        }
    } catch (error) {
        console.error(error);
        return next(handleErrors(500, 'Internal server error'));
    }
};



module.exports = { toggleLike};
