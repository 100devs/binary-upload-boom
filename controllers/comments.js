const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
      try {
        await Comment.create({
          comment: req.body.comment,
          likes: 0,
          post: req.params.id,
        });
        console.log("Comment has been added!");
        res.redirect("/post/"+req.params.id); //follow route go back to server js to start
      } catch (err) {
        console.log(err);
      }
    },
    deletePost: async (req, res) => {
      try {
        // Find comment by id
        let comment = await Comment.findById({ _id: req.params.id });
        await Comment.remove({ _id: req.params.id });
        console.log("Deleted Comment");
        res.redirect("/post/"+req.params.id);
      } catch (err) {
        res.redirect("/post/"+req.params.id);
      }
    },
  };