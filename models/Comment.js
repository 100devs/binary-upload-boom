const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema ({
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Comment", CommentSchema);