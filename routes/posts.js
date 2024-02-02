const express = require("express");
const router = express.Router();//express router handling
const upload = require("../middleware/multer");// helps upload images
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //checks if logged in

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); // (":id" is the variable holding value from get req URL. It is used in the Controller) also the object id

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
