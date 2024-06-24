const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);