const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', CommentSchema);