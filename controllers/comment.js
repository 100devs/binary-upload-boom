const Comment = require("../models/Comment")

module.exports = {

  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.title,
        likes: 0,
        post: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

};


