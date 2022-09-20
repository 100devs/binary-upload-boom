const express = require("express");
const router = express.Router();
const profilesController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Profile Routes - simplified for now
router.get("/:id", ensureAuth, profilesController.getProfile);

module.exports = router;