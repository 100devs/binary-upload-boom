const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req,res) => {
    try {
      await Comment.create({
        comment: req.body.comments,
        createdById: req.user.id,
        postId:req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  }
}