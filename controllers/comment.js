
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,

      });
      console.log("Post has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try{
      const comment = await Comment.findById(req.params.id);
      await comment.updateOne(
        // { _id: req.params.id},
        { $inc: { likes: 1} }
      );
      console.log(`comment id: ${req.params.id} has been liked ! ${comment.likes + 1}`);


      res.redirect('/post/' + comment.post)

    }catch(error){
      console.log(err);
    }
  },

};
