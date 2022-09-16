const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({ //schema is the blueprint. Creating a schema to specify each document that goes inside the collection. 
  title: {
    type: String,
    required: true,
  },
  image: { //url of the image
    type: String,
    require: true,
  },
  cloudinaryId: { //identifier for the image itself, helps delete the image from cloudinary itself as well
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
    type: mongoose.Schema.Types.ObjectId, //this field, is a mongoDB object ID that we are using to link posts to users 
    ref: "User", //referencing User model/schema
  },
  createdAt: {
    type: Date,
    default: Date.now, //it sets a date if one isn't added
  },
});

module.exports = mongoose.model("Post", PostSchema); //implement the blueprint by using a model and calling/activating the model, now exporting the schema as a model. Post is the name of the model. We didn't specify the name of the collection so mongoDB will name the collection posts, the same name as the model, just plural.