const Post = require("../models/Post")
const Comment = require("../models/Comment")

module.exports = {
  createComments: async (req, res) => {
    try {
      await Comment.create({

        comments: req.body.comments,
        likes: 0,
        //params grabbing id from url
        post: req.params.id,
        userCommenter: req.user.userName,
        userCommenterId: req.user.id
      })
      console.log("Comment has been added!")
      res.redirect("/post/" + req.params.id)
    } catch (err) {
      console.log(err)
    }
  },
  deleteComments: async (req, res) => {
    try {
      //pass more than one param at a time hmmmm
      await Comment.deleteOne({ _id: req.params.commentsId })
      res.redirect("/post/" + req.params.postId)
    } catch (err) {
      console.log(err)
    }
  }
}
