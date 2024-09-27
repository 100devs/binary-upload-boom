//  Use express package
const express = require("express");
// Use express Router method to be able to direct to routers 
const router = express.Router();
//Pathway to auth controller
const authController = require("../controllers/auth");
//Pathway to home Controller
const homeController = require("../controllers/home");
//Pathway to posts Controller 
const postsController = require("../controllers/posts");
//Require the middleware for ensureAuth that will check to see if a user is logged in 
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
//ensureAuth makes sure a user is loggid in before the action in the controller 
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);

// simple routers 
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//export the router info to the server.js file 
module.exports = router;
