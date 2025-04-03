const express=require('express')
 const {registerUser, userLogin, updatePassword, updateProfile, showProfile, showAllUser, verifyEmail}=require('../controllers/userController')
const authUser = require('../middlewares/authUser')
const upload = require('../middlewares/multer')



 const userRouter=express.Router()


    userRouter.post('/register',registerUser)
    userRouter.post('/verify-email',verifyEmail)

    userRouter.post('/login',userLogin)

    userRouter.post('/password-reset', updatePassword)

  


    userRouter.put("/profile/update",upload.single('avatar'), authUser ,updateProfile);
    userRouter.get('/show/profile', authUser, showProfile)

   userRouter.get('/show/user', showAllUser)
    



    module.exports=userRouter

