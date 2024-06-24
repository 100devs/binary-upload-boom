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
  // Not working yet
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      await Comment.findByIdAndDelete({ _id: req.body._id });
      console.log(comments._id)
      // Delete comment from db
      // await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      res.redirect("/post/"+req.params.id);
    }
  }           
};
