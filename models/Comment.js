const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Comment', CommentSchema);
