const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
         await Comment.create({
            comment: req.body.comment,
            likes: 0,
            user: req.user.id,
            post: req.params.id,
            userName: req.user.userName
          });
          console.log("Comment has been added!");
          res.redirect(`/post/${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
      },
      likeComment: async (req, res) => {
        const comments = await Comment.findById(req.params.id);
        try {
          await Comment.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(303, `/post/${comments.post}`);
        } catch (err) {
          console.log(err);
        }
      },
}