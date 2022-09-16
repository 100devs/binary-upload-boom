const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
      try {
        await Comment.create({
          comment: req.body.comment,
          user: req.user.id,
          likes: 0,
          post: req.params.id,
        });
        console.log("Comment has been added!");
        res.redirect("/post/"+req.params.id); //follow route go back to server js to start
      } catch (err) {
        console.log(err);
      }
    },
    deleteComment: async (req, res) => {
      try {
        // Find comment by id
        console.log(req.params.id)
        let comment = await Comment.findById({ _id: req.params.id });
        await Comment.remove({ _id: req.params.id });
        console.log("Deleted Comment");
        res.redirect("/post/"+comment.post); //
      } catch (err) {
        res.redirect("/post/"+comment.post);
      }
    },
  };