const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  //   cloud_name: "vanarts-webdev",
  // api_key: "845662886462932",
  // api_secret:"mN86CqMF91mysJiIhbLiUIsbAS4"
});

module.exports = cloudinary;
