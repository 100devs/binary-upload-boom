const Comment = require("../models/Comments");

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                user: req.user.id,
            });
            console.log("Comment has been added!");
            res.redirect("/post/"+req.params.id);
        } catch (err) {
            console.log(err);
        }
    },
    likeComment: async (req, res) => {
        try {
            await Comment.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { likes: 1 } }
            );
            console.log("Likes +1");
            res.redirect(`/post/${req.body.postId}`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
             // Find comment by id
            let post = await Comment.findByIdAndDelete(req.params.id);
                console.log("Deleted Comment");
                res.redirect(`/post/${req.body.postId}`);
        } catch (err) {
             console.log(err);
        }
    },
};

//COMMNETS:
//Try to fix likePost and deletePost to make them work