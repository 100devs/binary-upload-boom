const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        parentPost: req.params.id,
        likes: 0,
        user: req.user.id,
        userName: req.user.userName,
      })
      console.log('Comment has been added!')
      res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}
