const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
          await Comment.create({
            comment: req.body.comment,
            likes: 0,
            post: req.params.id,
          });
          res.redirect("/post/"+req.params.id);
        } catch (err) {
          console.log(err);
        }
  },
  deleteComment: async (req, res) => {
    try {
      let comments = await Comment.findById({ _id: req.params.id });
      await Comment.remove({ _id: req.params.id });
      console.log("Comment Deleted");
      res.redirect("/post/");
    }catch (err) {
      res.redirect("/post/");
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: {likes : 1},
        }
      );
      console.log("Likes +1");
      res.redirect("/post/"+req.params.id);
    }catch (err) {
      console.log(err);
    }
  },
};