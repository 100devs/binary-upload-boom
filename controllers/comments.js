const User = require("../models/User");
const Comment = require("../models/Comment")

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                postId: req.params.postId,
                userId: req.user.id
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.params.postId}`);
        } catch (err) {
            console.log(err);
        }
    }
}