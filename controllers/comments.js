
const Post = require("../models/Post");
const Comment = require("../models/Comment");
//const cloudinary = require("../middleware/cloudinary");



module.exports ={
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post:req.params.id,
        likes: 0,
        createdBy:req.user.userName,
        createdById:req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({_id:req.params.commentid});
      console.log("Comment has been deleted!");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  },

  
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  },
};