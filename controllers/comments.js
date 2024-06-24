const Comment = require('../models/Comment')

module.exports = {
    createComment: async(req,res)=> {
 
        console.log(req.body, req.params)
    try {
        // Upload image to cloudinary

        await Comment.create({
        comment: req.body.comment,
    
        likes: 0,
        post: req.params.id,
        });
        console.log("Comment added has been added!");
        res.redirect(`/post/${req.params.id}`);
            } catch (err) {
        console.log(err);
            }
    
        }

}