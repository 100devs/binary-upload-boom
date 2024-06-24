const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    userName: { type: mongoose.Schema.Types.String, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    likes: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
