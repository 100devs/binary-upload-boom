const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.String,
        required: "User"
    },
    comment: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", CommentSchema);
