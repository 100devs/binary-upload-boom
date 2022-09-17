const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
    
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id,
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
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.id)
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
