const Comment = require("../models/Comment")

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                //grabs id from the post we passed in
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.params.id}`);
            //take'Em back to that same post
        } catch (err) {
            console.log(err);
        }
    },
};
