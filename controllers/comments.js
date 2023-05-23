const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req,res) => {
    try {
      await Comment.create({
        comment: req.body.comments,
        createdById: req.user.id,
        postId:req.params.id,
        likes:0,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req,res) => {
    try {
      console.log(req.params)
      await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.postId}`);
    } catch (error) {
      console.log(error)
    }
  }

}