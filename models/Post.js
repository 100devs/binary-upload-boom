const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);


/*
The code provided defines a Mongoose schema for a "Post" model in a MongoDB database. This schema defines the structure and properties of the "Post" documents that will be stored in your database. Let's break down what this code does:

    const mongoose = require("mongoose");:
        This line imports the Mongoose library, which is a popular library for interacting with MongoDB from Node.js applications.

    const PostSchema = new mongoose.Schema({ ... });:
        This code creates a new Mongoose schema named PostSchema. A schema defines the structure of documents (records) that will be stored in a MongoDB collection. In this case, it defines the structure for "Post" documents.

    Schema Fields:

        The schema specifies various fields for a "Post" document, each with its own data type and optional validation rules:
            title: A required field of type String representing the post's title.
            image: A required field of type String representing the URL or identifier of the post's image.
            cloudinaryId: A required field of type String representing the identifier for the image in Cloudinary (assuming Cloudinary is used for image storage).
            caption: A required field of type String representing the post's caption or description.
            likes: A required field of type Number representing the number of likes the post has.
            user: A field of type ObjectId that references the "User" model. This represents the user who created the post.
            createdAt: A field of type Date with a default value of the current date and time. It represents the timestamp when the post was created.

    module.exports = mongoose.model("Post", PostSchema);:
        This code exports the Mongoose model for the "Post" schema. It allows you to use this model in other parts of your application, such as route handlers and controllers, to perform CRUD (Create, Read, Update, Delete) operations on "Post" documents in your MongoDB database.
*/
