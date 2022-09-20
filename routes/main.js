const express = require("express"); //use expresssss
const router = express.Router(); //use it for your router
const authController = require("../controllers/auth"); //make sure they're signed in
const homeController = require("../controllers/home"); //use the home controller
const postsController = require("../controllers/posts"); //use the post controller

const { ensureAuth, ensureGuest } = require("../middleware/auth"); //use ya midware to auth

//Main Routes - simplified for now
router.get("/", homeController.getIndex); //root route root route
router.get("/profile", ensureAuth, postsController.getProfile); //once you're logged in proper you get ya prof
router.get("/feed", ensureAuth, postsController.getFeed); //....aaand your feed
router.get("/login", authController.getLogin); //but you have to login
router.post("/login", authController.postLogin); 
router.get("/logout", authController.logout); //and out
router.get("/signup", authController.getSignup); //and sign up to begin with 
router.post("/signup", authController.postSignup);


module.exports = router;
