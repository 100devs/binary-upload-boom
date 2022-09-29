const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        require: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
    

module.exports = mongoose.model("Wishlist", WishlistSchema);