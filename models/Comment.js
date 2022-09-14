//imports mongoose
const mongoose = require("mongoose");

//creates a new comment Schema
const CommentSchema = new mongoose.Schema({
    //comment property
    comment: {
        type: String,
        required: true,
    },
    // user id property
    madeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // likes property
    likes: {
        type: Number,
        required: true,
    },
    // id of post comment belongs to
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    // date created at
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//exports this model, names collection comments
module.exports = mongoose.model('Comment', CommentSchema)