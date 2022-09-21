const mongoose = require("mongoose");

const Favorite = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    list:{
        type: [String]
    }
})