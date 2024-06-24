const Comment = require("../models/Comment");
const User = require('../models/User')

module.exports = {
  createComment: async (req, res) => {
    try {
      let commentbyUser = await User.findById(req.user.id)
      console.log(commentbyUser)
      await Comment.create({
        comment: req.body.comment,
        likes:0,
        post:req.params.id,
        user: commentbyUser,
      });
      console.log("Post has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById(req.params.id );
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/post/"+comment.post);
    } catch (err) {
      res.redirect("/profile"+req.params.id);
    }
  },
};
