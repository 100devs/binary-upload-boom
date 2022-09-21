const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        dislikes: 0,
        user: req.user.id,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id)
      await Comment.findOneAndDelete({_id: req.params.id})
      res.redirect(`/post/${comment.post}`)
    } catch (e) {
      console.error(e)
    }
  }
};
