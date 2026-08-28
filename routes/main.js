const express = require("express"); // import express
const router = express.Router(); // creates a router object
const authController = require("../controllers/auth"); // import auth controller
const homeController = require("../controllers/home"); // import home controller
const postsController = require("../controllers/posts"); // import posts controller
const { ensureAuth, ensureGuest } = require("../middleware/auth"); // imports authenitication middleware

//Main Routes - simplified for now
router.get("/", homeController.getIndex); // gets the homepage when someone comes to site
router.get("/profile", ensureAuth, postsController.getProfile); // gets the profile page
router.get("/feed", ensureAuth, postsController.getFeed); // gets the feed page
router.get("/login", authController.getLogin); // gets the login page
router.post("/login", authController.postLogin); // submits login info when logging in
router.get("/logout", authController.logout); // handles logging out of a profile
router.get("/signup", authController.getSignup); // displays the sign up page
router.post("/signup", authController.postSignup); // submits sign up info when creating a profile

module.exports = router; // exports the router for other files to use
