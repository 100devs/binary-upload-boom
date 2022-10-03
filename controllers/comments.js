const Comment = require("../models/Comment");

//add Post model
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {
      // creates a new comment
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
  deleteComments: async (req, res) => {
    try {
      await Comment.deleteOne({_id: req.params.commentid})
      res.redirect("/post/"+req.parmas.postid);
    } catch(err) {
      console.log(err);
    }
  }
};
