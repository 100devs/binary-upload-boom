const Comment = require("../models/Comment");

module.exports = {
    createComment: async(req, res) => {
        try {

            await Comment.create({
                comment: req.body.comment,
                post: req.params.id,
                likes: 0,
                user: req.user.id,
            });
            console.log("Post has been added!");
            res.redirect("/post/" + req.params.id);
        } catch (err) {
            console.log(err);
        }
    },
    likeComment: async(req, res) => {
        try {
            const comment = await Comment.findOneAndUpdate({ _id: req.params.id }, {
                $inc: { likes: 1 },
            });
            console.log("Likes +1");
            res.redirect(`/post/${comment.post}`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async(req, res) => {
        try {
            // Find post by id
            const comment = await Comment.findById({ _id: req.params.id });
            console.log(comment)
                // Delete post from db
            await Comment.deleteOne({ _id: req.params.id });
            console.log("Deleted Post");
            res.redirect("/post/" + comment.post);
        } catch (err) {
            res.redirect("/post/" + comment.post);
        }
    },
};