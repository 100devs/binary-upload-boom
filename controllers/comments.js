const Post = require("../models/Post");
const Comment = require("../models/Comment");


module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        madeBy: req.body.madeBy,
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

};


