const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Profile");
const Comment = require("../models/Comment");
const Profile = require("../models/Profile");

module.exports = {

  createProfile: async (req, res) => {
    console.log("hello")
    
    try {
        console.log(req.body)
        
      // Upload image to cloudinary and telling cloudinary exactly where to grab it store the results from cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //add post information to the database using the Post Model 
      console.log(result)
    
      await Profile.create({
        //getting the title from the form request
        userAbout: req.body.userAbout,
        //using the cloudinary result url for image that was uploaded
        imageProfile: result.secure_url,
        //unique image id from cloudinary
        cloudinaryId: result.public_id,
        //users input for caption
        dogName: req.body.dogName,
        //like counter
        userActivies: req.body.userActivies,
        dogSize: req.body.dogSize,
        areaCode:req.body.areaCode,
        user: req.user.id,

      });
      console.log("Post has been added!");
      //redirect back to the profile after if the post was successful
      res.redirect("/profile");
    } catch (err) {
        console.log("createprofile error")
      console.log(err);
    }
  },
  
};
