const express = require('express');
const { followUser, fectchFollower, fetchFollowing } = require('../controllers/followController');
const authUser = require('../middlewares/authUser');
const { followingUserBlogs } = require('../controllers/followingBlogs');


const followRouter = express.Router();

followRouter.post('/follow',authUser,followUser)
followRouter.get('/fetch/follow',authUser,fectchFollower)


followRouter.get('/follow-user-blog',authUser,followingUserBlogs)


followRouter.get('/following-user',authUser,fetchFollowing )
module.exports = followRouter