const Comment = require('../models/Comment')


module.exports = {
    createComment: async (req, res) => {

        try {
            console.log(req.user)
            await Comment.create({comment: req.body.commentsText, // comes from form
            likes: 0,
            user: req.user.id,
            userName: req.user.userName,
            post: req.params.id}) // passing ID from the URL

            console.log("Comment has been added!");
            res.redirect("/post/" + req.params.id);  //add post id
        } catch (err) {
            console.log("lol " + err);
        }
    },

};