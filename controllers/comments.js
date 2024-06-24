const Comment = require('../models/Comment')

module.exports = {
    postComment: async (req,res) => {
        try{
            await Comment.create({
                comment: req.body.comment,
                userId: req.user.id,
                likes: 0,
                postId: req.params.postId
            })
            console.log("A comment has been added!")
            res.redirect(`/post/${req.params.postId}`)
        } catch(err){
            console.error(err)
        }
    },
    deleteComment: async (req,res) => {
        try{
            const comment = await Comment.findById({ _id: req.params.commentId }).lean()
            await Comment.findOneAndDelete({ _id: req.params.commentId})
            console.log('Comment deleted!')
            res.redirect(`/post/${comment.postId}`)
        } catch(err){
          console.error(err)  
        }
    },
    likeComment: async (req,res) => {
        try {
            const comment = await Comment.findById({ _id: req.params.commentId})
            const liked = comment.likers.includes(req.user.id)
            if(liked){
                console.log('User already liked comment.')
                await Comment.findByIdAndUpdate(
                    { _id: req.params.commentId }, 
                    { 
                        $inc: {likes: -1},
                        $pull: { likers: req.user.id }
                    }
                )
                console.log("Likes -1.")
            } else {
                await Comment.findByIdAndUpdate(
                    { _id: req.params.commentId }, 
                    { 
                        $inc: {likes: 1},
                        $push: { likers: req.user.id }
                    }
                )
                console.log('Like added to comment')
            }
            res.redirect(`/post/${comment.postId}`)
        } catch(err){
            console.error(err)            
        }
    }
}