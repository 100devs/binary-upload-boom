const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	postid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	deleted:{
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("Comment", CommentSchema);
