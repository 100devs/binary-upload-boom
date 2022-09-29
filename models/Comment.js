const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        },
    likes: {
        type: Number,
        default: 0,
        required: true,
        },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        // wasn't too sure why Leon put a reference here, but apparently it's so that mongoose knows there's a relationship between Post's _id values and Comment's post values. This is for relational database stuff, but not really necessary at this point.
        // misconception I had in the beginning was that reference was inputting id values automagically, but know we're doing it manually
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);