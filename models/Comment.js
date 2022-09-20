const  mongoose =  require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true,
        minlen: 10,
        unique: false,
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
