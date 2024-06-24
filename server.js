const express = require("express"); //change node to super node
const app = express();
const mongoose = require("mongoose"); //for schemas to filter data going into the db
const passport = require("passport"); //authentication
const session = require("express-session"); //keep session/login info stored
const MongoStore = require("connect-mongo")(session); //used to store session info and will remove them when expired
const methodOverride = require("method-override"); //to override requests. Used in posts.ejs to change post request of a form to put or delete so we do not rely on client side js for anything.
const flash = require("express-flash"); //for errors when logging in
const logger = require("morgan"); //log info in terminal being sent to/from server
const connectDB = require("./config/database"); //mongodb
const mainRoutes = require("./routes/main"); //where main routes are
const postRoutes = require("./routes/posts"); //where post routes are
const commentRoutes = require("./routes/comments"); //where comments are

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
    secret: "keyboard cat", //change to env when we post online
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

/*
add name of poster when you view a post
Reset password?
Maybe show more info than just the picture on the feed?
add comments for posts
limit likes to only 1 per person

Bootstrap is how it has CSS and is adjusted using HTML attributes
bootstrap is added VIA partials since they are added to each EJS
*/

