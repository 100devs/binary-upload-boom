const Comment = require("../models/Comments");

module.exports = {
    createComment: async (req, res) => {
        try {
          await Comment.create({
            comment: req.body.comment,
            likes: 0,
            user: req.user.id, 
            post: req.params.id,
            createdBy: req.user.userName
          });
          console.log("Comment has been added!");
          res.redirect("/post/"+req.params.id);
        } catch (err) {
          console.log(err);
        }
      },
      deleteComment: async (req, res) => {
        try {
          await Comment.deleteOne({ _id : req.params.commentId })
          res.redirect('/post/'+req.params.postId)
        } catch (err) {
          console.log(err)
        }
      }
}