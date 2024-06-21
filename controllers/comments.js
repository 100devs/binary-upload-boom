const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find({ postId: req.body.postId });
      res.json(comments);
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      const comment = await Comment.create({
        comment: req.body.commentText,
        madeBy: req.user.id,
        postId: req.body.postId,
      });
      console.log("Comment has been added!");
      // The way I found to send the username at the time you add a comment: fetching the user with the commenter id, and sending it in the response object. I don't know why but I couldn't get it to create a new property for the comment object. Had to change the madeBy property already present for it to work.
      const newUser = await User.findOne({ _id: comment.madeBy });
      comment.madeBy = newUser.userName;
      res.json(comment);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    console.log(req.body.commentId);
    try {
      await Comment.findOneAndDelete({ _id: req.body.commentId });
      console.log("Deleted Comment");
      res.json("Deleted Comment");
    } catch (err) {
      console.log(err);
    }
  },
};
