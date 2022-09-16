const Comment = require("../models/Comment");

module.exports = {
	createComment: async (req, res) => {
		try {
			await Comment.create({
				title: req.body.title,
				comment: req.body.comment,
				post: req.params.id,
			});
			console.log("Comment has been added!");
			res.redirect("/profile");
		} catch (err) {
			console.log(err);
		}
	},
};
