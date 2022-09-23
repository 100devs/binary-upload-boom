const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    likers: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post", 
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Comment", CommentSchema)