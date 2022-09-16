const Comments = require('../models/Comment')

module.exports = {
  createComment : async (req, res) => {
    try {
      await Comments.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      console.log(req.params)
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      const post = await Comments.findById(req.params.id);
      console.log("Comment Likes +1", post);
      res.redirect(`/post/${post.post}`);
    } catch (err) {
      console.log(err);
    }
  },  
}