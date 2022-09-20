const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");

module.exports = {
  
  createComment: async (req, res) => {
    try {
      await Comment.create({
        message: req.body.message,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
};
