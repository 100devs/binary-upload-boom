const Post = require("../models/Post"); //you gotta know which post to comment on, and have a model for it
const Comment = require("../models/Comment"); //you gotta use the comment model

module.exports = {

  createComment: async (req, res) => { //create a comment using the comment model which has the text body, likes, and post ID
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

  deleteComment: async (req, res) => { 
    try {
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(comment.cloudinaryId);
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/post/"+req.params.id);
    }
  },
};
