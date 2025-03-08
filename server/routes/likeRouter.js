const express = require('express');
const { toggleLike } = require('../controllers/likeController');
const authUser = require('../middlewares/authUser');


const likeRouter = express.Router();

likeRouter.post('/like',authUser,toggleLike)


module.exports = likeRouter