const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    
    comment: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    likes:{
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model("Comment", CommentSchema);
