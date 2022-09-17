const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");

// Auth
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex); // login and sign up home page
router.get("/profile", ensureAuth, postsController.getProfile); // get user profile
router.get("/feed", ensureAuth, postsController.getFeed); // get feed

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
