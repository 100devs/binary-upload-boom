const Comments = require("../models/Comments");

module.exports = {
  createCommet: async (req, res) => {
    try {
      await Comments.create({
        title: req.body.comments,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment submitted!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
