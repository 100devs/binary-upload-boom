const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
      try {
        await Comment.create({
           comment: req.body.comment,
           likes: 0,
           post: req.params.id,
           createdAt: Date.now(),
        });
        console.log("Post has been added!");
        res.redirect("/profile");
      } catch (err) {
        console.log(err);
      }
  }
}