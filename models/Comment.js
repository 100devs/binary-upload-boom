const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({ //schema is the blueprint
    comment: {
    type: String,
    required: true,
    },
    likes: {
    type: Number,
    required: true,
    },
    post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    },
    createdAt: {
    type: Date,
    default: Date.now, //it sets a date if one isn't added
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
