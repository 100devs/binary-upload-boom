const Comment = require("../models/Comment");



module.exports = {
    createComment: async (req, res) => {
        try{
            console.log(req.params.id)
            await Comment.create({
                userName: req.user.userName,
                comment: req.body.comment,
                postId: req.params.id
            })
            console.log('Comment added')
            res.redirect(`/post/${req.params.id}`);

        } catch (err) {
            console.log(err)
        }
    }
}
