const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {  // field name should be 'user' instead of 'userId'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Blog: {  // field name should be 'Blog' instead of 'BlogId'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
