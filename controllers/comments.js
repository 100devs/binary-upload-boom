const Comment = require("../models/Comment"); // Import Comment model

module.exports = { // Export functions

  createComment: async (req, res) => { // Create comment
    try {
      await Comment.create({ // Create post
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!"); // Log that post has been added
      res.redirect("/post/"+req.params.id); // Redirect to post page
    } catch (err) { // If error
      console.log(err); // Log error
    }
  }
};
