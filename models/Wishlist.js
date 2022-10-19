const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  postId:{
    type: String,
  },
  title: {
    type: String,
    
  },
  cloudinaryId: {
    type: String,
    
  },
  caption: {
    type: String,
    
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





  /* postId: {            /////////////////////changed 'title to post'
        type: String,
        required: true,
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
    */

module.exports = mongoose.model("Wishlist", WishlistSchema);