const Comment = require('../models/Comment');
const User = require('../models/User');
module.exports = {
	createComment: async (req, res) => {
		try {
			const commentUser = await User.findById({ _id: req.user.id });
			const comment = await Comment.create({
				comment: req.body.comment,
				likes: 0,
				post: req.params.id,
				createdBy: req.user.userName,
				createdById: req.user.id,
			});
			console.log(comment);
			console.log('Comment has been added!');
			res.redirect('/post/' + req.params.id);
		} catch (err) {
			console.log(err);
		}
	},
	deleteComment: async (req, res) => {
		try {
			await Comment.deleteOne({ _id: req.params.commentid });
			res.redirect('/post/' + req.params.postid);
		} catch (error) {
			console.error(error);
		}
	},
};
