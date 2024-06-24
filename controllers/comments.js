const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        postId:req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

};
