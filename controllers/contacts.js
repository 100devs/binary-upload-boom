const Contact = require("../models/Contact");
const Comment = require("../models/Comment")
const Doctor = require("../models/Doctor");
const cloudinary = require("../middleware/cloudinary");



module.exports = {
getDirectory: async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: "desc" }).lean();
      res.render("directory.ejs", { contacts: contacts });
    } catch (err) {
      console.log(err);
    }
  },
getContact: async (req, res) => {
  console.log(req.body)
    try {
      const contact = await Contact.findById(req.params.id);
      res.render("contact.ejs", {  contact: contact, user: req.user, });
    } catch (err) {
      console.log(err);
    }
  },
createContact: async (req, res) => {
  console.log(req.body)
  console.log(req.user)
    try {
      

      await Contact.create({

        title: '',
        address: req.body.address,
        phone: req.body.phone,
        user: req.user.id,
      });
      console.log("Contact has been added!");
      res.redirect("/contact");
    } catch (err) {
      console.log(err);
    }
  },
  deleteContact: async (req, res)=>{
    try{
  // Find contact by id
  let contact = await Contact.findById({ _id: req.params.id });
  // Delete the contact from the db
        await Contact.remove({ _id: req.params.id });
        console.log('Deleted Contact!');
        res.json('Deleted Contact');
    res.redirect("/contact");
}catch(err){
    res.redirect("/contact");
    }
},

}