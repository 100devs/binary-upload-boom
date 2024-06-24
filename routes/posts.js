const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // Referencing multer so we can process the image
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); // Like setting up a parameter that allows us to grab the value out of the url, like a query parameter. Variable /:id contains the unique ID of the post that we clicked on. 

router.post("/createPost", upload.single("file"), postsController.createPost); // Post request being passed including uploading the image. upload.single("file") is a multer method being used to upload the single file and store it until we are ready to send it to cloudinary. Then we can go to the controller and start writing it to the database. 

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;