//multer.js module contains the multer configuration and the multer uploader function to upload images to the server and store the image url in the database.

const multer = require("multer"); //multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. multer is used to upload images to the server.
const path = require("path"); //path is a node.js module that provides utilities for working with file and directory paths. It can be used to get the file extension of the image.

module.exports = multer({ //export the multer module so it can be used in other files.
  storage: multer.diskStorage({}), //multer.diskStorage is a function that creates a storage engine that stores files on the disk.
  fileFilter: (req, file, cb) => { //fileFilter is a function that is used to filter out files that are not images.
    let ext = path.extname(file.originalname); //get the file extension of the image using path.extname which takes the original name of the file as an argument.
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") { //if the file extension is not .jpg, .jpeg or .png, return an error message.
      cb(new Error("File type is not supported"), false); //cb is a callback function that takes an error message and a boolean value as arguments.
      return; //return the error message and the boolean value.
    }
    cb(null, true); //if the file extension is .jpg, .jpeg or .png, return null and true. 
  },
});
