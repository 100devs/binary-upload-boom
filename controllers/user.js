const cloudinary = require("../middleware/cloudinary");
const validator = require("validator")
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
	getPrivateProfile: async (req, res) => {
		try {
		  const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" }).limit(4).lean();
		  res.render("profile.ejs", { posts: posts, user: req.user });
		} catch (err) {
		  console.log(err);
		}
	},
	getPublicProfile: async (req, res) => {
		try {
			const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
			res.render("public.ejs", { posts: posts, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},
	updateInfo: async (req, res) => {
		const action = req.body.update

		let userToUpdate
		try {
            userToUpdate = await User.findById(req.user.id)
        } catch (err) {
            console.error(err)
        }

		if (action == 'picture'){
			try {
				const result = await cloudinary.uploader.upload(req.file.path, { width: 100, height: 100, crop: 'fill', gravity: 'auto' });
				userToUpdate.profile = result.secure_url
				await userToUpdate.save()
			} catch (error) {
				console.error(error)
        	}
			res.redirect('back')
		} 
		
		if (action == 'info'){
			let newName = req.body.newName
			let newEmail = req.body.newEmail

			if (!req.body.newName) newName = userToUpdate.userName 
			if (!req.body.newEmail) newEmail = userToUpdate.email

			userToUpdate.userName = newName
			userToUpdate.email = newEmail

			try {
				await userToUpdate.save()
			} catch (error) {
				console.error(error)
			}
			console.log('Updated user info')
			res.redirect("back");
		}
	},
	updatePassword: async (req, res) => {

	},
	updatePicture: async (req, res) => {

	},
	updateBio: async (req, res) => {

	}
}