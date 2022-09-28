const express = require("express");
const router = express.Router(); //this is used to create a new router object to create request
const authController = require("../controllers/auth"); //perfoms basic authentication. login, account creation, logout, etc
const homeController = require("../controllers/home"); 
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;//practical way to create all the initial setup and exports the module
