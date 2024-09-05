const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      console.log(req.body); // Check what's in req.body
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id, 
        likes: 0,
        user: req.user._id
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
