const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      // TODO - add new properties to each document
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName, //getting the username
        createdById: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComments: async (req, res) => {
    try {
      await Comment.deleteOne({_id: req.params.commentid});
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err)
    }
  }
 };