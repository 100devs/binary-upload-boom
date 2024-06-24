async createComment(req, res) {
    const postID = req.params.postID;
    const result = await Comments.create({
        content: req.body.content,
        post: postID,
        user: req.user.id,
    });
    res.redirect(`/post/${req.body.post}`);
},