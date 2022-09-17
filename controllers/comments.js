const Comment = require('../models/Comment')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id })
            res.render('profile.ejs', { posts: posts, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: 'desc' }).lean()
            res.render('feed.ejs', { posts: posts })
        } catch (err) {
            console.log(err)
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            //Using comment model to find comments collection find all comments that have post property of the current post I'm on
            //Then sorted in descending order
            //Lean to get pure js object
            const comments = await Comment.find({ post: req.params.id })
                .sort({ createdAt: 'desc' })
                .lean()
            //Pass comments into ejs to show comments
            res.render('post.ejs', { post: post, user: req.user, comments: comments })
        } catch (err) {
            console.log(err)
        }
    },
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
            })
            console.log('Comment has been added!')
            res.redirect('/post/' + req.params.id)
        } catch (err) {
            console.log(err)
        }
    },
    likePost: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                },
            )
            console.log('Likes +1')
            res.redirect(`/post/${req.params.id}`)
        } catch (err) {
            console.log(err)
        }
    },
    deletePost: async (req, res) => {
        try {
            // Find post by id
            let post = await Post.findById({ _id: req.params.id })
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId)
            // Delete post from db
            await Post.remove({ _id: req.params.id })
            console.log('Deleted Post')
            res.redirect('/profile')
        } catch (err) {
            res.redirect('/profile')
        }
    },
}
