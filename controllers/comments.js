const Comment = require('../models/Comment')

module.exports = {
    createComment: async (reqest, response) => {
        try {
            const result = await cloudinary.uploader.upload(request.file.path);

            await Comment.create({
                body: request.body.comment,
                likes: 0,
                user: request.user.id,
                post: request.params.id
            });
            console.log("Comment has been added!");
            response.redirect("/profile");
        } catch (err) {
            console.log(err);
        }
    },
    likeComment: async (request, response) => {
        try {
            await Comment.findOneAndUpdate(
                { _id: request.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            response.redirect(`/Comment/${request.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (request, response) => {
        try {
            let Comment = await Comment.findById({ _id: request.params.id });
            await cloudinary.uploader.destroy(Comment.cloudinaryId);
            await Comment.remove({ _id: request.params.id });
            response.redirect("/profile");
        } catch (err) {
            response.redirect("/profile");
        }
    },
};
