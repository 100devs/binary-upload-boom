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
				{ _id: req.params.idComment },
				{
					$inc: { likes: 1 },
				}
			);
			console.log("Likes +1");
			console.log(`post ${req.body.postid}`)
			res.redirect(`/post/${req.body.postid}`);
		} catch (err) {
			console.log(err);
		}
	},
	softDeleteComment: ()=>{
		likePost: async (req, res) => {
			try {
				await Comment.findOneAndUpdate(
					{ _id: req.params.id },
					{
						$inc: { likes: 1 },
					}
					);
					console.log("Likes +1");
					console.log('Comment ${commentID} has been deleted')
					res.redirect(`/post/${req.params.id}`);
			} catch (err) {
				console.log(err);
			}
		}
	
	}
		
};
