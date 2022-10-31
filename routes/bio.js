const express = require("express");
const router = express.Router();
const bioController = require("../controllers/bio");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Post Routes - simplified for now

router.get("/", bioController.getBio);
router.post("/createBio", bioController.createBio);


module.exports = router;