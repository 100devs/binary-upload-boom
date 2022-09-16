const Comments = require("../models/Comment");

module.exports = {
  addComment: async (req, res) => {
    try {
      // Upload image to cloudinary

      await Comments.create({
        comment: req.body.comment,
        likes: 0,
        user:req.user.id,
        post:req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {

    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`back`);
    } catch (err) {
      console.log(err);
    }
  }
};
