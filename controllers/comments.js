const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    
    try {

      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        user: req.user.id,
        likes: 0,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
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
};
