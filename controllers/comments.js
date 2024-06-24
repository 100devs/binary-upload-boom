
const Post = require("../models/Post");
const Comment = require("../models/Comments");
//const cloudinary = require("../middleware/cloudinary");
module.exports = {
  createComment: async (req, res) => {
    try {
      //TODO - add new properties to each document
      //const commentUSer = await User.findById(req.user.id);
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
  deleteComments: async (req, res) => {
    try {
      await Comment.deleteOne({_id: req.params.commentid})
      res.redirect("/post/"+req.params.id);
    } catch(err) {
      console.log(err)
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
}
