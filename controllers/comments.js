const Comment = require("../models/Comment");

module.exports = {
  makeComment: async(req, res) => {
    try{
      await Comment.create({
        body: req.body.comment,
        madeBy: req.user.id,
        postID: req.params.id,
    });
    res.redirect("/post/"+req.params.id);
    } catch(err){
      console.log(err)
      res.redirect("/post/"+req.params.id);
    }
  },
};
