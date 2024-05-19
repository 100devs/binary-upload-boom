const Comment = require("../models/Comment");

module.exports = {
<<<<<<< HEAD
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
  };
=======
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
>>>>>>> 4129bedfe93ac30e728fa18acb1dfb96632d4d30
