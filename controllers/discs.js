const cloudinary = require("../middleware/cloudinary");
const Disc = require("../models/Disc");
const Comment = require("../models/Comment");

module.exports = {
  getYourBag: async (req, res) => {
    try {
      const discs = await Disc.find({ user: req.user.id });
      res.render("yourBag.ejs", { discs: discs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const discs = await Disc.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { discs: discs });
    } catch (err) {
      console.log(err);
    }
  },
  getDisc: async (req, res) => {
    try {
      const disc = await Disc.findById(req.params.id);
      const comments = await Comment.find({disc: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("disc.ejs", { disc: disc, user: req.user, comments: comments});
    } catch (err) {
      console.log(err);
    }
  },
  createDisc: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Disc.create({
        discName: req.body.discName,
        discBrand: req.body.discBrand,
        discSpeed: req.body.discSpeed,
        discGlide: req.body.discGlide,
        discTurn: req.body.discTurn,
        dicsFade: req.body.discFade,
        likes: 0,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Disc has been added!");
      res.redirect("/yourBag");
    } catch (err) {
      console.log(err);
    }
  },
  likeDisc: async (req, res) => {
    try {
      await Disc.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/disc/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteDisc: async (req, res) => {
    try {
      // Find Disc by id
      let disc = await Disc.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(disc.cloudinaryId);
      // Delete Disc from db
      await Disc.remove({ _id: req.params.id });
      console.log("Deleted Disc");
      res.redirect("/yourBag");
    } catch (err) {
      res.redirect("/yourBag");
    }
  },
};


