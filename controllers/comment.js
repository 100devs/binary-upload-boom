
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req,res,next) => {
    try {
        await Comment.findOneAndDelete(req.body.commentId);
        res.end();
    } catch (error) {
        return next(error);
    }
  }
};