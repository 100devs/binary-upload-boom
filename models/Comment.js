const  mongoose =  require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;
