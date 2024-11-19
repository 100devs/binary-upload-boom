
const Comment = require("../models/Comment.js");

module.exports = {
 
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id,
        userName: req.user.userName,
      });
      console.log(req.user)
      console.log(req.user.userID)
      console.log("Comment has been added!");
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
      let comment = await Comment.findById({ _id: req.params.id });
    console.log(req)
      // Delete post from db
      await comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
