const Comment = require("../models/comment");


module.exports = {
	createComment: async (req, res) => {
		try {
			await Comment.create({
				comment: req.body.comment,
				likes: 0,
				post: req.params.id,
			});
			console.log("a comment has been made!");
			res.redirect("/post/"+req.params.id);
		} catch (err) { 
			console.log(err);
		}
	},
};
