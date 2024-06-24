// using express
const express = require("express");
// sets up the route handler
const router = express.Router();
// our 3 controllers to handle different requests
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
// middleware for passport which allows us to check if users are logged in
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
// get request on root route, go to home controller to use the get get index method
router.get("/", homeController.getIndex);

// get request on /profile route, ensure we are logged in and go to posts controller to use the get profile method
router.get("/profile", ensureAuth, postsController.getProfile);

// get request on /feed route, ensure we are logged in and go to posts controller to use the get feed method
router.get("/feed", ensureAuth, postsController.getFeed);

// get request on /login route, go to auth controller to use the get login method
router.get("/login", authController.getLogin);

// post request on /login route, go to auth controller to use the post login method
router.post("/login", authController.postLogin);

// get request on /logout route, go to auth controller to use the loguout method
router.get("/logout", authController.logout);

// get request on /signup route, go to auth controller to use the get signup method
router.get("/signup", authController.getSignup);

// post request on /signup route, go to auth controller to use the post signup method
router.post("/signup", authController.postSignup);

module.exports = router;
