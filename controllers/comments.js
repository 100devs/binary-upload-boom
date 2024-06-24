//const { Model } = require("mongoose");
const Comment = require("../models/Comment");


module.exports = {

createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      await Comment.create({
        comment: req.body.comment,
        //image: result.secure_url,
        //cloudinaryId: result.public_id,
        //caption: req.body.caption,
        likes: 0,
        post: req.params.id,
      });
      console.log("Post has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
};