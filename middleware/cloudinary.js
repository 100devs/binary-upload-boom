//cloudinary.js module contains the cloudinary configuration and the cloudinary uploader function to upload images to cloudinary and store the image url in the database and the cloudinaryId in the database as well.
const cloudinary = require("cloudinary").v2; //cloudinary is a cloud service that provides a solution to a web application's entire image management pipeline. v2 is the version of cloudinary we are using.

require("dotenv").config({ path: "./config/.env" }); //require the .env file in the config folder and use it to access the cloudinary api key and secret key.

//Configure cloudinary
cloudinary.config({ //configure cloudinary with the api key and secret key from the .env file.
  cloud_name: process.env.CLOUD_NAME, //cloud_name is the name of the cloudinary account
  api_key: process.env.API_KEY, //api_key is the api key for the cloudinary account
  api_secret: process.env.API_SECRET, //api_secret is the api secret for the cloudinary account
});

module.exports = cloudinary; //export the cloudinary module so it can be used in other files.
