const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
   
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);//follow route back to server js to start
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      let comment = await Comment.findById({_id: req.params.id});
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect("/post/"+comment.post);
    } catch (err) {
      res.redirect("/post/"+comment.post);
    }
  },
};