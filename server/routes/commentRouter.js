const express = require('express');
const { addComment, deleteComment } = require('../controllers/commentController');
const authUser = require('../middlewares/authUser');
const commmentRouter=express.Router();

commmentRouter.post('/comment-add',authUser,addComment)
commmentRouter.delete('/comment/:commentId',authUser,deleteComment)


module.exports = commmentRouter