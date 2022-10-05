const Comment = require("../models/Comment");

module.exports = {

createComment: async (req, res) => {
    try {
        await Comment.create({
            comment: req.body.comment,
            likes: 0,
            post: req.params.id,
            user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
deleteComment: async (req, res) => {
  try {

    let returnRoute = await Comment.findById(req.params.id, 'post').lean()
    let comment = await Comment.findById({_id: req.params.id})
    
    // Delete comment from db
    await Comment.remove({ _id: req.params.id });
    console.log("Deleted Comment");
    res.redirect("/post/"+returnRoute.post);
  } catch (err) {
     res.redirect("/post/"+returnRoute.post);
    }
  },
  
  likeComment: async (req, res) => {
    try {

      let returnRoute = await Comment.findById(req.params.id, 'post').lean()

      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect("/post/"+returnRoute.post);
    } catch (err) {
      console.log(err);
      res.redirect("/post/"+returnRoute.post)
    }
  },

}

