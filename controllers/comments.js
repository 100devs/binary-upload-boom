const Comment = require("../models/Comment");

  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      await Comment.create({
        Comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/+req.params.id");
    } catch (err) {
      console.log(err);
    }
  };
