const Comment = require("../models/Comment");

module.exports = {
 
  createComment: async (req, res) => {
		try {
			await Comment.create({
				comment: req.body.comment,
				likes: 0,
				post: req.params.id,
				user: req.user.id,
				userName: req.user.userName,
			});
			console.log("Comment has been added!");
			res.redirect("/post/"+req.params.id);
		} catch (err) {
			console.log(err);
		}
	},
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");

      // Find comment by id and assign to comment
      const comment = await Comment.findById({_id: req.params.id});
      // Redirect to post using post id from comment.post
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      //Redirect to post using post id from comment.post
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      res.redirect(`/post/${comment.post}`);
    }
  },
};
