const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema ({
    comment: {
        type: String,
        required: true,
        // uppercase: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    dislikes: {
        type: Number,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    createdBy: {
        type: String,
        ref: "User"
    },
    // this is for comparison
    createdByID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
  });

module.exports = mongoose.model("Comment", CommentSchema);
