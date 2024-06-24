const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;


/*
The code provided configures the Cloudinary SDK and exports it as a module. Cloudinary is a cloud-based service for managing and delivering media assets, such as images and videos. This code appears to be setting up your Express.js application to work with Cloudinary for image uploads and storage. Let's break down what this code does:

    const cloudinary = require("cloudinary").v2;:
        This line imports the Cloudinary SDK and specifically the v2 version of it. The v2 version provides a more modern and flexible API for working with Cloudinary compared to earlier versions.

    require("dotenv").config({ path: "./config/.env" });:
        This line loads environment variables from a ".env" file located in the "./config" directory using the dotenv package. Environment variables are typically used to store sensitive information like API keys and secrets.

    cloudinary.config({ ... });:

        This code configures the Cloudinary SDK with your credentials by calling the cloudinary.config() method.

        It uses the values stored in the process.env object, which are loaded from the ".env" file, to set the Cloudinary configuration. The specific configuration options being set are:
            cloud_name: Your Cloudinary cloud name.
            api_key: Your Cloudinary API key.
            api_secret: Your Cloudinary API secret.

        These credentials are essential for authenticating with Cloudinary's servers and making authorized requests to manage and retrieve media assets.

    module.exports = cloudinary;:
        This line exports the configured Cloudinary SDK as a module. By exporting it, you can import and use it in other parts of your Express.js application, such as routes or controllers, to handle image uploads and interactions with Cloudinary.

Overall, this code sets up Cloudinary for use in your application, allowing you to upload, manage, and serve images and other media assets in the cloud. The configuration information is stored in environment variables for security, and the Cloudinary SDK is made available as a module for use throughout your application.

*/