
const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        post: req.params.id,
        comment: req.body.comment,
        likes: 0
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } 
    catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { post: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Coment req.params.id" + req.params.id);
      console.log("Coment ID " + req.params.id);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  }
}
