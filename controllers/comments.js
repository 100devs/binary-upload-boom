//this is for adding a new comment
const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");

module.exports = {
  addComment: async (req, res) => {
    console.log(req.params);
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        postId: req.params.id,
      });
      console.log(`Comment by ${req.user.userName} added`);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
//   deletePost: async (req, res) => {
//     try {
//       // Find post by id
//       let post = await Post.findById({ _id: req.params.id });
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(post.cloudinaryId);
//       // Delete post from db
//       await Post.remove({ _id: req.params.id });
//       console.log("Deleted Post");
//       res.redirect("/profile");
//     } catch (err) {
//       res.redirect("/profile");
//     }
//   },
};
