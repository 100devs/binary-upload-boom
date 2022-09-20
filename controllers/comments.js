const Comment = require('../models/Comment');

module.exports = {
    createComment: async (req, res) => {
        try {
            console.log(req.params.id)
            await Comment.create({
                comment: req.body.comment, 
                likes: 0, 
                post: req.params.id})
            console.log('we made a comment')
            res.redirect(`/post/${req.params.id}`)
        }
        catch(err){
            console.log(err)
        }
    },
}

