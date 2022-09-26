const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {

  createComment: async (req, res) => {
    try {
      console.log(req.body)
      console.log(req.params)
      await Comment.create({
        text : req.body.comment,
        post : req.params._id
      })
      
      res.redirect(`/post/${req.params._id}`)

    }catch(err){
      console.log(err)
    }
  }
}