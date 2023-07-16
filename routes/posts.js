// imports to access the router from express and the controllers, aswell as auth middleware
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// id is a param that is used to access the corresponding post in the DB
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);
// id is a param that is used to access the corresponding post in the DB
router.put("/likePost/:id", postsController.likePost);
// id is a param that is used to access the corresponding post in the DB
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
