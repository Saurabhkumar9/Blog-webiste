const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

const Category=mongoose.model('Category',categorySchema)
module.exports=Category