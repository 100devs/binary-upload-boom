const Comment = require("../models/Comment");

module.exports = {
	createComment: async (req, res) => {
		try {
			await Comment.create({
				comment: req.body.comment,
				user: req.user.id,
				postid: req.params.idPost,
			});
			console.log("Comment has been added!");
			res.redirect("/post/" + req.params.idPost);
		} catch (err) {
			console.log(err);
		}
	},
	likeComment: async (req, res) => {
		try {
			await Comment.findOneAndUpdate(
				{ _id: req.param.idComment },
				{
					$inc: { likes: 1 },
				}
			);
			console.log("Likes +1");
			res.redirect(`/post/${Comment.findById({ _id: req.params.idPost }).user}`);
		} catch (err) {
			console.log(err);
		}
	},
};
