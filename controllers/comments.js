const Comment = require("../models/Comment.js");


module.exports = {
  createComment: async (req, res) => {
    try {
      if (!req.body.comment || !req.params.id || !req.user.id) {
        return res.status(400).send({ message: "Missing required fields to create" });
      }

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id
      });

      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Failed to create comment" });
    }
  },
  deleteComment: async (req, res) => {
      try {
        if (!req.params.id) {
          return res.status(400).send({ message: "Missing required fields to delete comment" });
        }

        await Comment.deleteOne({ _id: req.params.id });

        console.log("Deleted comment");
        return res.status(200).send({ message: "Comment deleted successfully" });
      } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Failed to delete comment" });
      }
    }
  }