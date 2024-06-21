const Comment = require("../models/Comment");


module.exports = {
createComment: async (req, res) => {
    try {
      // COMMENTING FEATURE
      await Comment.create({
        comment: req.body.comment,
        commentCount: 0, //change back to likes
        post: req.params.id,
        createdAt: req.body.createdAt,
      });
      await Comment.findOneAndUpdate( //can't figure out how to make this work
        { _id: req.params.id },
        {
          $inc: { commentCount: 1 },
        }
      );
      console.log("Comment +1");
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`); //might need to check this syntax
    } catch (err) {
      console.log(err);
    }
  }
}