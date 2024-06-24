const Comments = require("../models/Comment");
const User = require("../models/User");

module.exports = {
    async getComments(id) {
        const rawComments = await Comments.find({post: id}).sort({createdAt: "desc"});
        const comments = rawComments.map(async comment => {
            comment.user = await User.findById(comment.user);
            return comment;
        });
        return Promise.all(comments);
    },
    async createComment(req, res) {
        try {
            const postID = req.params.postID;
            const result = await Comments.create({
                content: req.body.content,
                post: postID,
                user: req.user.id,
            });
        } catch (e) {
            console.error(e);
        } finally {
            res.redirect(`/post/${req.params.postID}`);
        }
    },
    async likeComment(req, res) {
        const targetComment = await Comments.findOneAndUpdate({
            _id: req.params.id,
        }, {
            $inc: {
                likes: 1,
            }
        });
        res.redirect(`/post/${targetComment.post}`);
    },
    async deleteComment(req, res) {
        const targetComment = await Comments.findById(req.params.id);
        if (targetComment.user.toString() === req.user.id) {
            await Comments.deleteOne({_id: req.params.id});
        }
        res.redirect(`/post/${targetComment.post}`);
    },
}