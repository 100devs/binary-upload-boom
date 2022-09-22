const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        user: req.user._id,
        likes: 0,
      })
      console.log('Comment has been added!')
      res.redirect(`/post/${req.params.id}`) // Fix: go to the post's id
    } catch (err) {
      console.log(err)
    }
  },
}
