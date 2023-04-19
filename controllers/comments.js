const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                userName: req.user.userName,
                post: req.params.id,
                likes: 0
            });
            console.log(`${req.user.userName} added a comment!`);
            res.redirect(`/post/${req.params.id}`);
        } catch(err) {
            console.error(err);
        }
    }
}
