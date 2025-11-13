
![BUB-social-media-demo](https://github.com/user-attachments/assets/f7174646-b75e-45c8-9185-94b35598431d)

# BINARY UPLOAD BOOM

## Introduction

This is forked from a Simple Social Media App built using the MVC Architecture with multiple related schemas, implementing "authorization" so folx can sign up, customize & personalize the app, and cloudinary to store and retrieve uploaded media. The theme is based on the class inside joke from Independence Day "Binary Upload Boom". Because the original had started using Bootstrap for base styles, I used this project to learn and implement more Bootstrap.

---

## Features

- User sessions: sign up, log in, personalized profile page and delete permissions
- Posts: adding titles, images, captions, counts of likes
- Comments: comment on each post, like the comments, only post creator and comment writer can delete
- Packages have been updated and deprecated code adjusted from the original fork

---

## Local Setup

Install all the dependencies or node packages used for development via Terminal
`npm install`

Run
`npm start`

---

## Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

## Packages/Dependencies used

- bcrypt - hashing/salting/encrypting in order to not have plain text passwords stored in the database
- cloudinary - upload and serve media (used for storing post images)
- connect-mongo - helps with session storage in the database
- dotenv - to use environment variable files
- ejs - templating for rendering dynamic data to html
- express - node framework for easier setup
- express-flash - flash messages without request redirection (error messaging for forms)
- express-session - using cookies along with the db to keep track of logged in users
- method-override - override the default browser form methods of GET and POST to do be able to use DELETE and PUT
- moment - format dates to be more readable to users
- mongodb - to connect to mongo database
- mongoose - easily set up schemas for data being sent and stored in mongodb
- morgan - logging activity in the console
- multer - handles file uploads in forms and makes them accessible in routes
- nodemon - auto restart server after changes
- passport - strategies for authentication
- passport-local - allow user to make an account with sign in data instead of a different strategy
- validator - checks validity of strings to make sure user will enter the required data

---






