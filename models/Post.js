const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    cloudinaryId: {
      type: String,
      require: true,
    },
    caption: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    usersWhoLiked: [mongoose.Schema.Types.ObjectId],
    user: {
      type: mongoose.Schema.Types.ObjectId,  //compare: Todo userID was simply typed as String
      //also note: if front end needs to explicitly attach req.user unlike using ejs, ? esp if the logged in user is not the user who created the post
      ref: "User",
    }
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true  //both createdAt and updatedAt
  }
);

module.exports = mongoose.model("Post", PostSchema);
