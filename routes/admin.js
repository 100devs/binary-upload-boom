const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const adminController = require("../controllers/admin")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.post("/addPlayer", ensureAuth, adminController.addPlayer);
router.post("/addMatch", ensureAuth, adminController.addMatch);
router.post("/addAnnouncement", ensureAuth, adminController.addAnnouncement);
router.post("/startSeason", ensureAuth, adminController.startSeason);


module.exports = router;
