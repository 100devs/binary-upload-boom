const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        // user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  // getComment: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
  //     res.render("post.ejs", { post: post, user: req.user, comments: comments });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  likeComment: async (req, res) => {
    try {
      const comment = await Comment.findOneAndUpdate(
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
  // deleteComment: async (req, res) => {
  //   try {
  //     // Find comment by id
  //     let post = await Comment.findById({ _id: req.params.id });
  //     // Delete post from db
  //     await Comment.remove({ _id: req.params.id });
  //     console.log("Deleted Comment");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
  deleteComment: async (req, res) => {
    console.log(req.body.commentId);
    try {
      await Comment.findOneAndDelete({ _id: req.body.commentId });
      console.log("Deleted Comment");
      res.json("Deleted Comment");
    } catch (err) {
      console.log(err);
    }
  },
};
