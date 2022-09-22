const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
    createComment: async (req, res) => {
        try {
            //finds username of commenter
            let commentUser = await User.findById(req.user.id)
            console.log(req.body)
            await Comment.create({
                //for the comment itself
                text: req.body.comment,
                //the username of the requesting user, grabbed from User model schema
                commenter: commentUser.userName,
                //assigns userid to requesting user id
                commenterId: req.user.id,
                //links comment to post, grabbed from url
                post: req.params.id
            });
            console.log("Comment has been added!");
            res.redirect("/profile");
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find comment by id, and deletes
            await Comment.deleteOne({ _id: req.params.commentid });
            console.log("Deleted Comment");
            res.redirect("/post/"+req.params.postid);
        } catch (err) {
            console.log(err)
        }
    },
};