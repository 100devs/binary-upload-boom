const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Main Routes

// @desc Get the homepage.
// @route GET /
router.get("/", homeController.getIndex);
// @desc Get profile page using the authentication middleware.
// @route GET /profile
router.get("/profile", ensureAuth, postsController.getProfile);
// @desc Get the user feed using the authentication middleware.
// @route GET /feed
router.get("/feed", ensureAuth, postsController.getFeed);
// @desc Get login page.
// @route GET /login
router.get("/login", authController.getLogin);
// @desc Post login info to authenticate user.
// @route POST /login
router.post("/login", authController.postLogin);
// @desc Finish log session.
// @route GET /logout
router.get("/logout", authController.logout);
// @desc Get signup page.
// @route GET /signup
router.get("/signup", authController.getSignup);
// @desc Post signup info to create a new user.
// @route POST /signup
router.post("/signup", authController.postSignup);

module.exports = router;
