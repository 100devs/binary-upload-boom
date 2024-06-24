const Comment = require('../models/Comment')

module.exports = {
    createComment: async (req, res) => {
        try {
            console.log(req.user)
            await Comment.create({
	            comment: req.body.comment,
	            post: req.params.id,
                user: req.user
	        })
	        res.redirect('/post/' + req.params.id)
        } catch (error) {
            console.log(error)
        }
    }
}