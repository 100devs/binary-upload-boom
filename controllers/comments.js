const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {

    createComment: async (req, res) => {
        try {
            console.log(req.body)
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                userName: req.user.userName,
                post: req.params.id,
                user: req.user.id
            });
            console.log("Comment has been added!");
            res.redirect("/post/" + req.params.id,);
        } catch (err) {
            console.log(err);
        }
    },

};
