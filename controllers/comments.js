
const Comment=require("../models/Comments");
module.exports = {

  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

};
