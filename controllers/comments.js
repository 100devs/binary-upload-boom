const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  createComment: async (req, res) => {
    try {
  
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        dislikes: 0,
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
  
};
