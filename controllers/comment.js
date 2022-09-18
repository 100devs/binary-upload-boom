const Comments = require("../models/Comments");

module.exports = {
  postComment: async (req, res) => {
    try {
      await Comments.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.Username,
      });
      console.log("comment has been created");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comments.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // Delete post from db
      await Comments.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/post/" + comment.post);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
