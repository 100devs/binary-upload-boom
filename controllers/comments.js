const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    console.log(req.params.id, req.user.id)
    try {  
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        createdBy: req.user.id,
        likedBy: []
      });
      console.log("Comment has been added!");
      res.redirect("back");
    } catch (err) {
      console.log("Error on createComment: ", err);
    }
  },
  likeComment: async (req, res) => {
    try {
      const currentUser = req.user.id;
      let comment = await Comment.findById(req.params.id);
      if (comment.likedBy.includes(currentUser)) {
        comment.likedBy.pull(currentUser)
        await comment.save();
      } else {
        comment.likedBy.push(currentUser);
        await comment.save();
      }
      res.redirect("back");
    } catch (err) {
      console.log("Error on comment like/dislike: ", err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("back");
    } catch (err) {
        console.log("Error on delete comment")
        res.redirect("/profile");
    }
  },
};
