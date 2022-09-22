const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema({
  tool: {
    type: String,
    required: true,
  },
  
  amount: {
    type: Number,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);