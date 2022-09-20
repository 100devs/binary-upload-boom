const Comment = require("../models/Comment")
const Post = require("../models/Post");

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                user: req.user.id,
                post: req.params.id,
            });
            console.log("Comment added")
            res.redirect("/post/"+req.params.id)
        } catch (error) {
            console.log(error)
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find comment
            // let comment = await Comment.find({ _id: req.params.id });
            // // Delete post from db
            // await Post.remove({ _id: req.params.id });
            // console.log("Deleted Post");
            // res.redirect("/profile");
            // console.log(req.body)
            let comment = await Comment.find({_id: req.params.id})
            await Comment.deleteOne({_id: req.params.id})
            res.redirect("/post/"+comment[0].post)
        } catch (error) {
            console.log(error)
        }
    },
    likeComment: async (req, res) => {
        try {
            await Comment.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            console.log("comment liked")
            res.redirect()
        } catch (error) {
            console.log(error)
        }
    }
};