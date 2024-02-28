const express = require("express");
const app = express(); // allows us to use express() with only typig 'app'
const mongoose = require("mongoose"); // used for constructing schemas (Model)
const passport = require("passport"); // authentication
const session = require("express-session"); // for storing a user's session info
const MongoStore = require("connect-mongo")(session); 
const methodOverride = require("method-override"); // for overriding POSTs to PUTs n DELETEs
const flash = require("express-flash"); // believe this is for rendering without submitting GET reqs
const logger = require("morgan"); // for logging?
const connectDB = require("./config/database"); // for connecting mongo db
const mainRoutes = require("./routes/main"); // importing routes/main.js file
const postRoutes = require("./routes/posts"); // importing routes/posts.js file
const commentRoutes = require("./routes/comments"); // importing routes/comments.js file

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); 

// Passport config  
require("./config/passport")(passport); 

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
