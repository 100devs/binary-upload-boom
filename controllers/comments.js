const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
    addComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
            });
            console.log("added comment");
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    }, //COULDN'T GET likeComment TO REDIRECT TO POST/POST.ID
    likeComment: async (req, res) => {
        try {
            await Comment.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                },
                {
                    new: true
                });

            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    }
}