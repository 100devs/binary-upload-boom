// copy and paste post controller

const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
        // change to Comment model
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        // change to req.params.id to tie the comment to the id
        post: req.params.id,
      });
      console.log("Comment has been added!");
      // redirect to the post after it goes to the server
      res.redirect("/post/" +req.params.id );
    } catch (err) {
      console.log(err);
    }
  },
};
