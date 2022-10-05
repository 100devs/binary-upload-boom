# Introduction
---
This project is a work in progress.
I created The Art Lounge to fill the need for artists to request and receive genuine feedback that would help them improve their artwork. Generally, artists have to depend on their social media following, which may not be a reliable source because most people will say the artwork is great if they already like the artist's work, and they may also not understand what to look for in terms of artistic analysis. 

---

# Objectives
---
The purpose of The Art Lounge is to provide a space for people to post their art and design to receive constructive criticism, professional critiques, and general appreciation for the users' artwork with a focus on helping them improve their skills. 

---

# Who is this for?
---
The platform is open to anyone with a serious interest in improving their artistic skills. 

---

# Packages/Dependencies
---
- Bcrypt
- Cloudinary
- Dotenv
- Mongo and Connect-mongo
- Express, Express-flash, and Express-sessin
- Ejs
- Method-override
- MongoDB
- Mongoose
- Moment
- Morgan
- Multer
- Nodemon
- Passport and Passport-local
- Validator

---

# MVC Structure
---
![The Art Lounge MVC Model](https://github.com/wo1vin/socialnetwork/blob/main/public/imgs/socialnetwork-mvc.png?raw=true)

---

# Dire Directions, Dear Developers
---
- To install, use the command `npm install`
- Create a `.env` file in config folder
- Add it to `.gitignore` file if you plan to deploy or push to GitHub
- Add the following as `key = value`:
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`
- To run the program, use `npm start`

Happy Coding!

---

# Optimizations
---
- Add icon next to "Log out"
- Expand past visual art ex. Music
- Tag system, request critique.
- Users can label themselves with tags
- Users can send recommendations to one another (ex. "Ash thinks you should look at this artwork by Jon")