

const Comment = require("../models/Comment");
const { getPost } = require("./posts");

module.exports = {

    createComment: async (req, res) => {
        try {
            
            await Comment.create({
                comment: req.body.comment,
                post: req.params.postId,
                likes: 0,
                user: req.user.id,
                createdBy: req.user.userName,
        });
        console.log("Comment has been added!");
        res.redirect("/post/"+req.params.postId);
        } catch (err) {
        console.log(err);
        }
    },

    likeComment: async (req, res) => {
    try {
        console.log(req.params.id)
        //Single out a post on DB and add a like.
        await Comment.findByIdAndUpdate(
            { _id: req.params.commentId },
            
            {
                $inc: { likes: 1 }
            },
            {commentLiked: true}
        );
        console.log("Like added");
        res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
        console.log(err);
    }
},
    deleteComment: async (req, res) => {
        try {
            // Delete post from db
            await Comment.findByIdAndDelete({ _id: req.params.commentId});
            console.log(req.params.id)
            console.log("Comment deleted");
            res.redirect(`/post/${req.params.postId}`);
        } catch (err) {
            console.log(err);
            res.redirect("/profile");
        }
    },
}