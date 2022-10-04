const Doctor = require("../models/Doctor");
// const Comment = require("../models/Comment")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const providers = await Provider.find({ user: req.user.id });
      res.render("providers.ejs", { providers: providers, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getDoctor: async (req, res) => {
    try {
      const doctors = await Doctor.find({ user: req.user.id });
      res.render("doctors.ejs", { doctors: doctors, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
//   getCabinet: async (req, res) => {
//     try {
//       const posts = await Post.find().sort({ createdAt: "desc" }).lean();
//       res.render("cabinet.ejs", { posts: posts });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getPost: async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
//       res.render("post.ejs", { post: post, user: req.user, comments: comments });
//     } catch (err) {
//       console.log(err);
//     }
//   },
  createDoctor: async (req, res) => {
    try {
      // Upload image to cloudinary
    //   const result = await cloudinary.uploader.upload(req.file.path);

      await Doctor.create({
        title: req.body.title,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        location: req.body.location,
        // likes: 0,
        user: req.user.id,
      });
      console.log("Doctor has been added!");
      res.redirect("/providers");
    } catch (err) {
      console.log(err);
    }
  },
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
  deleteDoctor: async (req, res) => {
    try {
      // Find provider by id
      let doctor = await Doctor.findById({ _id: req.params.id });
      // Delete image from cloudinary
    //   await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete provider from db
      await Doctor.remove({ _id: req.params.id });
      console.log("Deleted Doctor");
      res.redirect("/providers");
    } catch (err) {
      res.redirect("/providers");
    }
  },
};
