
const Comment = require("../models/Comment");


module.exports = {

  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        createdBy: req.user.userName,
        createdById: req.user.id,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
 deleteComment: async (req, res) => {
      try {
        // Find comment by id passed from form
        await Comment.deleteOne({ _id: req.params.commentid });
        console.log("Deleted Comment");
        res.redirect(`/post/${req.params.postid}`);
      } catch (err) {
        console.log(err)
        res.redirect(`/post/${req.params.postid}`);
      }
    },
};
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