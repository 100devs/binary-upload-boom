const Post = require("../models/Post");
const Comment = require("../models/Comment")
const commentsController = require("../controllers/comments")
module.exports = {
    getProfile: async(req, res) => {
        try {
            const post = await Post.find({ user: req.user.id });
            res.render("profile.ejs", { posts: post, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    getPost: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            console.log(post)
            const comment = await Comment.findById({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
            res.render("post.ejs", { post: post, comments: comment, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    createComment: async(req, res) => {
        try {

            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                posts: req.params.id,
            });
            console.log("Comment has been added!");
            res.redirect("/post/" + req.params.id);
        } catch (err) {
            console.log(err);
        }
    },

    // deleteComment: async(req, res) => {
    //     try {
    //         // Find comment by id
    //         let comment = await comment.findById({ _id: req.params.id });
    //         await Comment.remove({ _id: req.params.id });
    //         console.log("Deleted Comment");
    //         res.redirect("/post/" + req.params.id);
    //     } catch (err) {
    //         res.redirect("/post/" + req.params.id);
    //     }
    // },
};