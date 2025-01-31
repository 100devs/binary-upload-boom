const cloudinary = require("cloudinary").v2;
//USE CLOUDINARE V2

require("dotenv").config({ path: "./config/.env" });
//ALLOW EXPRESS TO USE ENV TO GET ACCES TO CLOUDINARY SECRETS

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
