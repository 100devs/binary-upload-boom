const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const directoryController = require("../controllers/directory");
const contactsController = require("../controllers/contacts")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Med Routes - simplified for now
router.get("/:id", ensureAuth, contactsController.getContact);

router.post("/createContact",  contactsController.createContact);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteContact/:id", contactsController.deleteContact);

module.exports = router;

