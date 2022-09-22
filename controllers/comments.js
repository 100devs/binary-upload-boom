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
      console.log(err)
    }
  },

  //   deletePost: async (req, res) => {
  //     try {
  //       // Find post by id
  //       let post = await Post.findById({ _id: req.params.id })
  //       // Delete image from cloudinary
  //       await cloudinary.uploader.destroy(post.cloudinaryId)
  //       // Delete post from db
  //       await Post.remove({ _id: req.params.id })
  //       console.log('Deleted Post')
  //       res.redirect('/profile')
  //     } catch (err) {
  //       res.redirect('/profile')
  //     }
  //   },
}
