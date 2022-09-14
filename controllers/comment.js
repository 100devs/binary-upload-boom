const Comment = require('../models/Comment')

module.exports = {
  getComments: async(req, res) => {
    try {
      const comments = await Comment.find({user: req.user.id, post: req.params.id})
      return comments
    }catch (err) {
      console.log(err)
    }
  },
  createComment: async(req, res) => {
    console.log('req.body: ', req.body)
    try{
      await Comment.create({
        text: req.body.text,
        user: req.user.id,
        post: req.body.post,
        userName: req.body.userName,
      })
      res.redirect(`/post/${req.body.post}`);
    }catch (err) {
      console.log(err)
    }
  }
}