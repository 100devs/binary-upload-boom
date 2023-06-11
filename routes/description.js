const express = require("express");
const router = express.Router();
const descriptionController = require("../controllers/description");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createDescription/:id", descriptionController.createDescription);

module.exports = router;
