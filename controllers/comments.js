
const Comment = require("../models/Comment")

module.exports = {
  postComment: async (req, res) => {
    const comment = req.body.comment
    const postId = req.params.id
    const user = req.body.user
    console.log(req.body)
    try { Comment.create({
      comment: comment,
      postId: postId,
      user: user
    })
    res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      console.log(err);
    }
  },
};