const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);

//@desc   Show user profile
//@Route  GET /profile/
router.get("/profile", ensureAuth, postsController.getProfile);

//@desc   Show user feed
//@Route  GET /feed
router.get("/feed", ensureAuth, postsController.getFeed);

//@desc   show login page
//@Route  GET /login/
router.get("/login", authController.getLogin);

//@desc   process login request
//@Route  POST /login
router.post("/login", authController.postLogin);

// @desc    Logout user
// @route   GET /logout
router.get("/logout", authController.logout);

//@desc   show signup page
//@Route  GET /signup
router.get("/signup", authController.getSignup);

//@desc   process signup request
//@Route  POST /signup
router.post("/signup", authController.postSignup);

module.exports = router;
