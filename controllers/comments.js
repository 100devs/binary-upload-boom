const Comment = require('../models/Comment')

module.exports = {
    createComment: async (req, res) => {
        console.log(req.user.userName)
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                user: req.user.id,
                userName: req.user.userName,
                post: req.params.id,
            })
            console.log('Comment has been added!')
            res.redirect(`/post/${req.params.id}`)
        } catch (err) {
            console.log(err)
        }
    }
}