const Comment = require("../models/Comment");

module.exports = {
	addComment: async (req, res) => {
		try {
			await Comment.create({
				comment: req.body.comment,
				likes: 0,
				post: req.params.postId,
				userId: req.user.id,
				userName: req.user.userName,
			});
			console.log("Comment has been added!");
			res.redirect(`/post/${req.params.postId}`);
		} catch (err) {
			console.log(err);
		}
	},
	deleteComment: async (req, res) => {
		try {
			await Comment.remove({ _id: req.params.id });
			console.log("Deleted Comment");
			res.redirect(req.get("referer"));
		} catch (err) {
			res.redirect(req.get("referer"));
		}
	},
};
