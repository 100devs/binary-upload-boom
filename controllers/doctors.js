const cloudinary = require("../middleware/cloudinary");
const Doctor = require("../models/Doctor");
// const Contact = require("../models/OldContacts");
const Comment = require("../models/Comment");

module.exports = {
  getContacts: async (req, res) => {
    try {
      const contacts = await COntact.find({ user: req.user.id });
      res.render("contacts.ejs", { contacts: contacts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getDirectory: async (req, res) => {
    try {
      const doctors = await Doctor.find().sort({ createdAt: "desc" }).lean();
      res.render("directory.ejs", { doctors: doctors });
    } catch (err) {
      console.log(err);
    }
  },
  getDoctor: async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      const comments = await Comment.find({doctor: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("doctor.ejs", { doctor: doctor, user: req.user, comments: comments });
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
        image: result.secure_url,
        cloudinaryId: result.public_id,
        address: req.body.address,
        phoneNr: req.body.phoneNr,
        user: req.user.id,
      });
      console.log("Doctor has been added!");
      res.redirect("/contacts");
    } catch (err) {
      console.log(err);
    }
  },
//   likeMed: async (req, res) => {
//     try {
//       await Med.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/med/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
  deleteDoctor: async (req, res) => {
    try {
      // Find med by id
      let doctor = await Doctor.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(doctor.cloudinaryId);
      // Delete med from db
      await Doctor.remove({ _id: req.params.id });
      console.log("Deleted Doctor");
      res.redirect("/contacts");
    } catch (err) {
      res.redirect("/contacts");
    }
  },
};
