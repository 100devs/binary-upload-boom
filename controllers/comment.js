const Comment = require("../models/Comment");

module.exports = {
	createComment: async (req, res) => {
		try {
			await Comment.create({
				comment: req.body.comment,
				likes: 0,
				user: req.user.id,
				postid: req.params.id,
			});
			console.log("Comment has been added!");
			res.redirect("/post/" + req.params.id);
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

			const comment = await Comment.findById(req.params.id);
			console.log("Likes +1");
			console.log(comment.postid);
			res.redirect(`/post/${comment.postid}`);
		} catch (err) {
			console.log(err);
		}
	},
};
