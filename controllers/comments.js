const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      //TODO - add new properties to each document 
      //const commentUser = await User.findById(req.user.id);
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by user id
      await Comment.deleteOne({ _id: req.params.commentid })
      // Delete comment from db
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      res.redirect("/post/"+req.params.post);
    }
  },
};
