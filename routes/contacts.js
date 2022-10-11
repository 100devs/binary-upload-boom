const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const contactsController = require("../controllers/contacts");
dashboardController = require("../controllers/dashboard");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Med Routes - simplified for now
router.get("/:id", ensureAuth, contactsController.getContact);

router.post("createContact", upload.single("file"), contactsController.createContact);

// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deleteMed/:id", medsController.deleteMed);

module.exports = router;

