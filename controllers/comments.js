const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
		createdBy: req.user.userName,
		picture: req.user.profile,
        post: req.body.post
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.body.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
		req.body.id, 
		{ 
			$inc: { likes: 1 }
		},
		{ new: true } 
		)
      res.json(updatedComment);
	  console.log('Likes +1')
    } catch (err) {
      res.status(400).end;
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find Comment by id
      let Comment = await Comment.findById({ _id: req.params.id });
      // Delete Comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
