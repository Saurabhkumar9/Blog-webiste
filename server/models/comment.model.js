const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    BlogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    userName:{
        type:String
    }
},{
    timestamps:true
})

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;