const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now

//get home page
router.get("/", homeController.getIndex);
//get user posts
router.get("/profile", ensureAuth, postsController.getProfile);
//get all user posts
router.get("/feed", ensureAuth, postsController.getFeed);
//login and logout
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
//signup
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
