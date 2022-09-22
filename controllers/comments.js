const Comment = require("../models/Comment");
//const User = require("../models/User");

module.exports = {
  createComment: async (req, res) => {
    try {
      // const commentUser = await User.findById(req.user.id)
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        // madeBy: commentUser.userName,
        madeBy: req.user.userName,
        madeByID: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id)
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      //let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      //await Comment.remove({ _id: req.params.id });
      await Comment.deleteOne({_id: req.params.commentid})
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postid)
    } catch (err) {
      res.redirect("/profile");
      console.log(err)
    }
  },
};
