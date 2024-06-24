const Comment = require("../models/Comments");
//const cloudinary = require("../middleware/cloudinary");

module.exports = {
  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.body.post
      });
      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/Comment/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find Comment by id
      let Comment = await Comment.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(Comment.cloudinaryId);
      // Delete Comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
