const Comment = require('../models/Comment');
const Post = require('../models/Post');


module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                createdBy: req.user.userName
            })
            console.log('Comment added!');
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err)
        }
    }
}