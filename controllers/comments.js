let Comment = require ('../models/Comment');
let Post = require ('../models/Post');

module.exports =
{
    createComment: async (req, res) => {
        try {
            await Comment.create({
                post: req.params.id,
                user: req.user._id,
                comment: req.body.comment
            });
            res.redirect("/post/" + req.params.id);
        }catch(err){
            console.error(err);
        }

    },
    likeComment: async (req, res) => {
        try {
            const comments = await Comment.findOneAndUpdate({_id: req.params.id},
                {
                    $inc: {likes : 1}
                });
            //res.redirect("/profile");
            res.redirect("/post/" + req.params.redirect)
        }catch(err){
            console.error(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const comments = await Comment.remove({ _id: req.params.id });
            //const post = await Post.find({ _id: req.params.redirect })
            console.log("Deleted!");
            res.redirect("/profile");
        }catch(err){
            console.error(err);
        }
    },
}
