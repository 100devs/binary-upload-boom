const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
// added Comment to pull in comment model
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Post.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Post has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
