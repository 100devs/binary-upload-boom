const Comment = require("../models/Comment");
const Post = require("../models/Post");


module.exports = {
    getComments: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            const comments = await Comment.find({ post: post });

            res.resder("post.ejs", { comments: comments });
        } catch (err) {
            console.log(err);
        }
    },

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
    }
}