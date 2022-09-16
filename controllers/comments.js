const Post = require('../models/Comments')

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                user: req.user.id,
            })
            console.log('Comment has been added!')
            res.redirect('/post/:id')
        } catch (err) {
            console.log(err)
        }
    },
}
