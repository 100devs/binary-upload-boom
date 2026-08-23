// import express and create router, import controller funcs to connect with router

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now

// root route, homepage (index)
router.get("/", homeController.getIndex);
// user must be auth'd
router.get("/profile", ensureAuth, postsController.getProfile);
// user must be auth'd
router.get("/feed", ensureAuth, postsController.getFeed);
// attempt login functionality
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// attempt logout functionality
router.get("/logout", authController.logout);

// attempt signup functionality
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
