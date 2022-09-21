const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        user: req.user.id,
      })
      console.log('Comment has been added!')
      res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      console.log(err.message)
    }
  },

  deleteComment: async (req, res) => {
    // Find comment by id
    const comment = await Comment.findById({ _id: req.params.id })
    try {
      // validation is done in ejs
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.id })
      console.log('Deleted Comment')
      res.redirect(`/post/${comment.post._id}`)
    } catch (err) {
      res.redirect(`/post/${comment.post._id}`)
    }
  },
}
