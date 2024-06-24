const Comment = require("../models/Comment");
const Post = require("../models/Post");


module.exports = {
    createComment: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            await Comment.create({
                comment: req.body.comment,
                user: req.user.id,
                post: post,
              });
              console.log("Comment has been added!");
              res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },

    deleteComment: async (req, res) => {
        try {
            await Comment.remove({ _id: req.params.commentId.slice(0, req.params.commentId.indexOf(".")) });
            res.redirect(`/post/${req.params.commentId.slice(req.params.commentId.indexOf(".")+1)}`);
        } catch (err) {
            console.log(err);
            res.redirect(`/post/${req.params.commentId.slice(req.params.commentId.indexOf(".")+1)}`);
        }
    }
}