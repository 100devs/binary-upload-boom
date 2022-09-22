const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.body.post,
                user: req.user.id,
            });
            console.log("Comment has been added!");
            res.redirect("/post/" + req.body.post);
        } catch (err) {
            console.log(err);
        }
    },
};
