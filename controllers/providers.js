const cloudinary = require("../middleware/cloudinary");
const Provider = require("../models/Provider");
const Doctor = require("../models/Doctor");
// const Comment = require("../models/Comment")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const providers = await Provider.find({ user: req.user.id });
      res.render("doctors.ejs", { providers: providers, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getProvider: async (req, res) => {
    try {
      const providers = await Provider.find({ user: req.user.id });
      res.render("providers.ejs", { providers: providers, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createProvider: async (req, res) => {
    try {
      // Upload image to cloudinary

      await Provider.create({
        title: req.body.title,
        location: req.body.location,
        user: req.user.id,
      });
      console.log("Provider has been added!");
      res.redirect("/providers");
    } catch (err) {
      console.log(err);
    }
  },
  createDoctor: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Doctor.create({
        title: req.body.title,
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
  deleteProvider: async (req, res) => {
    try {
      // Find provider by id
      let provider = await Provider.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // Delete provider from db
      await Provider.remove({ _id: req.params.id });
      console.log("Deleted Provider");
      res.redirect("/providers");
    } catch (err) {
      res.redirect("/providers");
    }
  },
};
