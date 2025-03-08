const mongoose=require("mongoose");
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
       type:String
    },
    categoryName:{
       type:String
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like',
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
    }],
    imagePublicId:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

const Blog=mongoose.model('Blog',blogSchema)
module.exports=Blog