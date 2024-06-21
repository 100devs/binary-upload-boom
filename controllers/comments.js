const Comments = require("../models/Comments");

module.exports = {
 
  createComment: async (req, res) => {
    try {
     //here we are trying to create a comment
      await Comments.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      //redirecting the user to the same post after the comment has been added 
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
};
