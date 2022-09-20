const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");


const friendFinder = require("../controllers/friendFinder");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/friendFinder/", friendFinder.getFeed);



module.exports = router;