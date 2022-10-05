const cloudinary = require("../middleware/cloudinary");
const Provider = require("../models/Provider");
const Doctor = require("../models/Provider");
const Comment = require("../models/Comment");

module.exports = {
  getProvider: async (req, res) => {
    try {
      const providers = await Provider.find({ user: req.user.id });
      res.render("doctor.ejs", { providers: providers, name: req.body.name, address: req.body.address, phoneNr: req.body.phoneNr, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getDoctor: async (req, res) => {
    try {
      const providers = await Provider.find().sort({ createdAt: "desc" }).lean();
      res.render("doctor.ejs", { providers: providers });
    } catch (err) {
      console.log(err);
    }
},
//   getMed: async (req, res) => {
//     try {
//       const med = await Med.findById(req.params.id);
//       const comments = await Comment.find({med: req.params.id}).sort({ createdAt: "desc" }).lean();
//       res.render("med.ejs", { med: med, user: req.user, comments: comments });
//     } catch (err) {
//       console.log(err);
//     }
//   },
  createProvider: async (req, res) => {
    try {
    //   // Upload image to cloudinary
    //   const result = await cloudinary.uploader.upload(req.file.path);

      await Provider.create({
        name: req.body.name,
        address: req.body.address,
        phoneNr: req.body.phoneNr,
        user: req.user.id,
      });
      console.log("Doctor has been added!");
      res.redirect("/doctor");
    } catch (err) {
      console.log(err);
    }
  },
  deleteProvider: async (req, res) => {
    try {
      // Find Dr by id
      let provider = await Provider.findById({ _id: req.params.id });
      // Delete Dr from db
      await Provider.remove({ _id: req.params.id });
      console.log("Deleted Dr");
      res.redirect("/doctor");
    } catch (err) {
      res.redirect("/doctor");
    }
  },
};
