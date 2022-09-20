const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const uploadAudio = require("../middleware/audioMulter");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.post("/createProfilePic",upload.single("file"), postsController.createProfilePic)

router.put("/createProfilePic",upload.single("file"), postsController.updateProfilePic)

router.post("/createProfileSong",uploadAudio.single("file"), postsController.createProfileSong)
 
router.put("/createProfileSong",uploadAudio.single("file"), postsController.updateProfileSong)

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
