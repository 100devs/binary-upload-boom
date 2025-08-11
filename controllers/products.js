const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");
const Company = require("../models/Company");
const Product = require("../models/Product");
const mongoose = require("mongoose");

module.exports = {
  getCustomerProfile: async (req, res) => {
    try {
      const comments = await Comment.find({});
      // { user: req.user.id }
      // );
      console.log("comments", comments);

      res.render("customerProfile.ejs", { comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  getCompanyProfile: async (req, res) => {
    try {
      const products = await Product.find({ companyId: req.user.id });
      console.log("getCompanyProfile see req.user.id", req.user.id);

      res.render("companyProfile.ejs", { products: products, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const companies = await Company.find().sort({ companyName: 1 });
      const products = await Product.find({ companyId: companies[0].id });
      console.log("products", products);
      // const products = await Product.find().sort({ createdAt: "desc" });
      res.render("feed.ejs", {
        products: products,
        companies: companies,
        company: null,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const averageRating =
        (await product.ratings.reduce((sum, rating) => sum + rating, 0)) /
          product.ratings.length || "No Ratings";
      const comments = await Comment.find({ productId: req.params.id }).sort({
        createdAt: "desc",
      });
      // .lean();
      console.log("comment model getProduct", Comment);
      res.render("product.ejs", {
        product: product,
        user: req.user,
        comments: comments,
        averageRating: averageRating,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createProduct: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Product.create({
        productTitle: req.body.productTitle,
        image: result ? result.secure_url : undefined,
        cloudinaryId: result ? result.public_id : undefined,
        productDescription: req.body.productDescription,
        productRating: 5,
        companyId: req.user.id,
        companyName: req.user.companyName,
      });
      console.log("Product has been added!");
      console.log("Products created", "companyId", req.user.id);
      res.redirect("/companyProfile");
    } catch (err) {
      console.log(err);
    }
  },
  rateProduct: async (req, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { ratings: req.body.productRating },
        }
      );
      console.log("Rating Updated");
      res.redirect(`/product/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      // Find post by id
      let product = await Product.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(product.cloudinaryId);
      // Delete post from db
      await Product.remove({ _id: req.params.id });
      await Comment.remove({ productId: req.params.id });
      console.log("Deleted Product");
      res.redirect("/companyProfile");
    } catch (err) {
      res.redirect("/companyProfile");
    }
  },
  addComment: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      console.log("productTitle", product.productTitle);
      await Comment.create({
        comment: req.body.comment,
        productId: req.params.id,
        productTitle: product.productTitle,
        userId: req.user._id,
        userName: req.user.userName,
      });
      console.log("comment has been added!");
      res.redirect(`/product/` + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  filterProducts: async (req, res) => {
    try {
      const companies = await Company.find();
      const products = await Product.find({
        companyId: mongoose.Types.ObjectId(req.body.company),
      });
      // const products = true
      console.log("products", products);
      console.log("companyId", req.body.company);
      const company = await Company.findById(req.body.company);

      console.log("res filterProducts", res.body);

      res.render("feed.ejs", {
        companies: companies,
        products: products,
        company: company,
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteComments: async (req, res) => {
    try {
      const comment = await Comment.findOne({ _id: req.params.id });
      await Comment.remove({ _id: req.params.id });
      console.log("Comment Deleted");
      res.redirect(`/product/` + comment.productId);
    } catch (err) {
      console.log(err);
    }
  },
};
