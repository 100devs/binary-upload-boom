const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const commentUser = await User.findById(req.user.id)
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id,
      });
      console.log("comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid });
      res.redirect("/post/" + req.params.postid);

      console.log("Deleted Comment");
    } catch (err) {
      console.log(err);
    }
  },
};
