const Comment = require("..models/Comment")

module.exports = {
    addComment: async (req, res) => {
        try{
            await Comment.create({
                comment: req.body.comment,
                post: req.user.id,
            })
            console.log("Comment added to post")
            res.redirect("post/"+req.params.id)

        }catch(err){
            console.log(err)
        }
    }
}