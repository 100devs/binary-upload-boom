const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
    getConfig: async (req, res) => {
      try {
        // const userid = await User.find({ _id: req.user.id })
        console.log(req.user)
        res.render("config.ejs", { user: req.user });
      } catch (err) {
        console.log(err);
      }
    },
    userName: async (req, res) => {
      try {
        await User.findOneAndUpdate(
          { _id: req.user.id },
          
           {userName: req.body.userName},
        );
        console.log("Likes +1");
        res.redirect(`/config`);
      } catch (err) {
        console.log(err);
      }
    },
    imageAvatar: async (req, res) => {
      try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(req)
  
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
          image: result.secure_url,
          cloudinaryId: result.public_id,
        },
        );
        console.log("Post has been added!");
        res.redirect("/config");
      } catch (err) {
        console.log(err);
      }
    },
  };
  