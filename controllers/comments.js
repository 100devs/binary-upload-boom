const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        content: req.body.comment,
        likes: 0,
        user: req.user.id,
		    postID: req.params.id
      });
      console.log(`Comment has been added on post ${req.params.id}!`);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  //TODO: likes, deletion
//   likeComment: async (req, res) => {
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
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${req.params.originPost}`);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
