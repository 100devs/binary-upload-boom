const Comment = require('../models/Comment')

module.exports = {
    createComment: async (reqest, response) => {
        try {
            // Upload image to cloudinary
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
            console.log("Likes +1");
            response.redirect(`/Comment/${request.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (request, response) => {
        try {
            // Find Comment by id
            let Comment = await Comment.findById({ _id: request.params.id });
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(Comment.cloudinaryId);
            // Delete Comment from db
            await Comment.remove({ _id: request.params.id });
            console.log("Deleted Comment");
            response.redirect("/profile");
        } catch (err) {
            response.redirect("/profile");
        }
    },
};
