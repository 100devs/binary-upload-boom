const Comment = require("../models/Comment");

// missing ??

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Commend has been added");
      res.redirect("/post/" + req.params.id)
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const postId = await Comment.findById({ _id: req.params.redirect });
      await Comment.remove({ _id: req.params.id  });
      console.log("Deleted comment");
      // TODO: Figure out how to redirect to post itself
      res.redirect( "/post/" + postId);
    } catch (err) {
      console.log("your deleteComment route sucks");
      res.redirect("/post/" + postId);
    }
  },
};