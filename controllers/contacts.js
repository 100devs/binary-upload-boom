const cloudinary = require("../middleware/cloudinary");
const Med = require("../models/Med");
const Contact = require("../models/Contacts");
const Comment = require("../models/Comment")
const contacts = require("../models/Contacts");

module.exports = {


getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find({ user: req.user.id });
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
getContact: async (req, res) => {
    try {
      const contacts = await Contact.findById(req.params.id);
      const comments = await Comment.find({doctor: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("contacts.ejs", { contacts: contacts, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
createContact: async (req, res) => {
    try {
      // // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Contact.create({
        name: req.body.name,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        address: req.body.address,
        phoneNr: req.body.phoneNr,
        // provider: req.body.provider,
        user: req.user.id,
      });
      console.log("Contact has been added!");
      res.redirect("/contacts");
    } catch (err) {
      console.log(err);
    }
  },

}