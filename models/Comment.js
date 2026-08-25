const mongoose = require("mongoose"); // imports the Node.js library Mongoose that helps your JS application communicate with mongodb

const CommentSchema = new mongoose.Schema({ // creates a comment schema to tell mongoose and mongodb what fields to expect from a comment. creates the bluepring and stores it in CommentSchema
  comment: { // creates the comment field
    type: String, // says the comment field must be a string
    required: true, // Makes sures a comment must have a comment value
  },
  likes: { // defines a field called likes
    type: Number, // says the likes must be a number
    required: true, // likes are required
  },
  post: { // This says every Comment can be associated with a Post, and keeps track of the id of the post the comment belongs to
    type: mongoose.Schema.Types.ObjectId, // tells mongoose the post field contains a mongodb objectid
    ref: "Post", // tells mongoose the Comment stores the id of the post it belongs to
  },
  createdAt: { // records when the Comment was created
    type: Date, // tells mongoose that createdAt contains a JS date
    default: Date.now, // says 'if no createdat value is provided, automatically use the current time'
  },
});

module.exports = mongoose.model("Comment", CommentSchema); // exports the file data to the controller. sends a mongoose model of your CommentSchema which allow your controller to use the data freely
