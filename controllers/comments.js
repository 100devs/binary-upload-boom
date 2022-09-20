const Comment = require("../models/Comment.js");

module.exports = {
      // COMMENTS
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment:req.body.comment,
                post:req.params.id, 
                user: {
                    id: req.user.id, 
                    username: req.user.userName
                }
            });

            req.flash("success", "Comment added!");
            res.redirect(`/post/${req.params.id}`);
        }
        catch(e) {
            console.error(e);
            next(e);
        }
    },
    likeComment: async (req, res) => {
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.id, {
                $inc: { likes: 1 }, // Increment likes by 1
              });

            req.flash("success", "Liked!");
            res.redirect(`/post/${comment.post}`);
        }
        catch(e) {
            console.error(e);
            next(e);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);

            req.flash("success", "Comment deleted.");
            res.redirect(`/post/${comment.post}`);
        }
        catch(e) {
            console.error(e);
            next(e);
        }
    },
}