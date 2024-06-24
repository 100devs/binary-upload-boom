const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  createComment: async (req, res) => {
    try {
      //TODO - add new properties to each document
      // const commentUser = await User.findById(req.user.id)
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        dislikes: 0,
        createdBy: req.user.userName,
        createdByID: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  // updateComment: async (req, res) => {
  //   try {
  //     await Comment.findOneAndUpdate
  //   }
  // }
  deleteComments: async (req, res) => {
    try {
      await Comment.deleteOne({_id: req.params.commentid})
      res.redirect("/post/"+req.params.postid)
    } catch(err) {
      console.log(err)
    }
  }
};
