const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
// new pages
router.get("/leaderboard", homeController.getLeaderboard);
router.get("/about", homeController.getAbout);
router.get("/admin", homeController.getAdmin);
router.get("/",homeController.getAnnouncement);
// router.get("/editProfiles", ensureAuth, postsController.getUserProfiles);
// end of new pages
router.get("/", homeController.getIndex);
router.get("/addAnnouncement", homeController.getAddAnnouncement);
router.get("/addPlayer", homeController.getAddPlayer);
router.get("/addMatch", homeController.getAddMatch);
router.get("/newSeason", homeController.getNewSeason);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
