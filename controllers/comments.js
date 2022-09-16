const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      const comment = await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        /* createdBy: [req.user.id, req.user.userName] */
        createdBy: req.user.id
      });      
      console.log("Comment has been added!", comment);
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      /* const commentDoc = await Comment.findById(req.params.id).lean() */
      const commentDoc = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${commentDoc.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const commentDoc = await Comment.findByIdAndDelete(req.params.id);
      console.log("Deleted Comment");
      res.redirect(`/post/${commentDoc.post}`);
    } catch (err) {
      console.error(err)
    }
  },
};
