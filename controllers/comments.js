const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      console.log("post ID:", req.params)
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
