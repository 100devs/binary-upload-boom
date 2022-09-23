const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
        await Comment.create({  //comment model
        comment: req.body.comment,  //from form name="comment"
        likes: 0,
        //user: req.user.id,
        post:req.params.id,
      });
      console.log("comment has been added!");
      res.redirect("/post/"+req.params.id);  //takes them back to current post
    } catch (err) {
      console.log(err);
    }
  },
 
};
