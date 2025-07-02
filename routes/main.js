//modules needed for main routes 
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex); //base route, GET request
router.get("/profile", ensureAuth, postsController.getProfile); //profile route, GET request, ensure user is logged in first
router.get("/feed", ensureAuth, postsController.getFeed); //feed route, GET request, ensure user is logged in first
router.get("/login", authController.getLogin); //login route, GET request
router.post("/login", authController.postLogin); //login route, POST request
router.get("/logout", authController.logout); //logout route, GET request
router.get("/signup", authController.getSignup); //signup route, GET request
router.post("/signup", authController.postSignup); //signup route, POST request

module.exports = router;
