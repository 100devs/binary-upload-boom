const cloudinary = require("../middleware/cloudinary");
const Med = require("../models/Med");
const Comment = require("../models/Comment")

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const meds = await Med.find({ user: req.user.id });
      res.render("dashboard.ejs", { meds: meds, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCabinet: async (req, res) => {
    try {
      const meds = await Med.find().sort({ createdAt: "desc" }).lean();
      res.render("cabinet.ejs", { meds: meds });
    } catch (err) {
      console.log(err);
    }
  },
  getDirectory: async (req, res) => {
    try {
      const med = await Med.findById({med: req.params.id});
      const contacts = await Contact.find().sort({ createdAt: "desc" }).lean();
      res.render("directory.ejs", { med: med, contacts: contacts });
    } catch (err) {
      console.log(err);
    }
  },
  getMed: async (req, res) => {
    try {
      const med = await Med.findById(req.params.id);
      const comments = await Comment.find({med: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("med.ejs", { med: med, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createMed: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Med.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        provider: req.body.provider,
        user: req.user.id,
      });
      console.log("Med has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  likeMed: async (req, res) => {
    try {
      await Med.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/med/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteMed: async (req, res) => {
    try {
      // Find med by id
      let med = await Med.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(med.cloudinaryId);
      // Delete med from db
      await Med.remove({ _id: req.params.id });
      console.log("Deleted Med");
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
};
