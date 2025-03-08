const express=require('express')
const { addCategory, showCategory } = require('../controllers/categoryController')
const authUser = require('../middlewares/authUser')
const categoryRouter=express.Router()

categoryRouter.post('/category-add',authUser,addCategory)

categoryRouter.get('/category-show', authUser,showCategory)

module.exports=categoryRouter