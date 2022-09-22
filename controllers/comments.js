const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.post_id,
      });
      console.log("Comment added!");
      res.redirect(`/posts/${req.params.post_id}`)
    } catch (err) {
      console.log(err)
    }
  },
  likeComment: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}