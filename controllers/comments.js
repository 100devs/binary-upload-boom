const Comment = require("../models/Comment");

const Post = require('../models/Post')


module.exports = {
  createComment: async (req, res) => {

    console.log(req.body)
        try {
            // Upload image to cloudinary
      
            const result = await Comment.create({
              comment: req.body.comment,
              likes: 0,
              post: req.params.id,
            });

            console.log(result)
            console.log("comment has been added!");
            res.redirect("/post/" + req.params.id);
          } catch (err) {
            console.log(err);
          }
  },


  addLike:async (req, res) => {
    console.log(req.params)
    const comment =  await Comment.findOne({_id:req.params.comment_id})
    console.log(comment)
    comment.likes++
    console.log(comment)
    await comment.save()
    res.redirect("/post/" + req.params.post_id);
    
  },
}
