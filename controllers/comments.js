const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      //create new post in db
      await Comment.create({
        //grab title from form
        comment: req.body.comment,
        //hard code likes
        likes: 0,
        //what user logged in ids
        post: req.params.id,
      });
      console.log("Comment has been added!");
      //redirect back to profile route
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
