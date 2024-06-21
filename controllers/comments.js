const Post = require('../models/Post')
const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        postId: req.params.postId,
        madeBy: req.user.id,
      })

      console.log('comment has been added!')
      res.redirect('/post/' + req.params.postId)
    } catch (err) {
      console.log(err)
    }
  },
}
