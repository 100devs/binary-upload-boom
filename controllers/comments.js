const Comment = require("../models/Comment");

module.exports = {
    getComments: async (req, res) => {

    },

    createComment: async (req, res) => {
        try {
            console.log(req.body)
            console.log(req.user)
            console.log(req.params)
            await Comment.create({
                comment: req.body.comment,
                madeBy: req.user.id,
                post: req.params.id
              })
              console.log("Post has been added!");
              res.redirect(`/post/${req.params.id}`);
        } catch (error) {
            console.log(error)
        }
    }
}