# Install

<!-- install  packages and dependencies since .gitignore contains node_modules because we don't want to upload such heavy info-->
`npm install`

---

# Things to add

<!-- create and .env file and add the following -->
- Create a `.env` file in config folder and add the following as `key = value`
<!-- tell the server to listen at PORT 2121 -->
  - PORT = 2121 (can be any port example: 3000)
<!-- connect to the mongoDB database -->
  - DB_STRING = `your database URI`
<!-- connect to the cloudinary for media -->
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run
<!--runs what ever is in package.json start AKA starts the server -->
`npm start`


<!-- Procfile is for Heroku hosting -->