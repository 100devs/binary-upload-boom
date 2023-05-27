const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,  //input name is 'comment' in post.ejs
        likes: 0,
        post: req.params.id,  //grabs post ID from parameters in URL
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id); //reroute back to the post
    } catch (err) {
      console.log(err);
    }
  },
};
