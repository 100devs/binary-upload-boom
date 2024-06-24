const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
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


// MongoDB collection name here  will give lowercase plural of name
module.exports = mongoose.model("Favorite", FavoriteSchema);
