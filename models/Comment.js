const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    commentByUser: {
        type: String,
        ref: 'User',
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    comment: {
        type: String,
        require: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', CommentSchema);