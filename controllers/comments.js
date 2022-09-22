const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id
      });
      console.log("Comment has been added!", req.body);
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  //! Added delete comment method
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid })
      console.log("comment removed")
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  }
};