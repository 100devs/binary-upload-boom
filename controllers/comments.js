const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                createdBy: req.user.userName,
                createdById: req.user.id
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        };
    },
    likeComment: async (req, res) => {
        try {
            await Comment.findOneAndUpdate(
                { _id: req.params.commentId },
                { $inc: { likes: 1 }}
            );
            console.log("Comment Likes +1");
            res.redirect(`/post/${req.params.postId}`);
        } catch (err) {
            console.log(err);
        };
    },
    deleteComment: async (req, res) => {
        try {
            await Comment.deleteOne({ _id: req.params.commentId });
            console.log("Comment deleted.")
            res.redirect(`/post/${req.params.postId}`);
        } catch (err) {
            console.log(err);
        };
    }
};