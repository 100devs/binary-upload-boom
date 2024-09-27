//  Use express package
const express = require("express");
// Use app instead of having to say require("express") every time using express
const app = express();
// Use mongoose package for Object data modeling library
const mongoose = require("mongoose");
// Use passport package for auth
const passport = require("passport");
// Use express sesssion package to create sessions
const session = require("express-session");
// Use connect-mongo package to save sessions into mongoDB using mongoStore
const MongoStore = require("connect-mongo")(session);
// Use methodOveride package to make PUT and DELETE req with forms 
const methodOverride = require("method-override");
// Use express-flash package to display flash content when logging in/signing up 
const flash = require("express-flash");
// Use morgan package to log the server and debug
const logger = require("morgan");
// Use the database configuration file to connect to DB
const connectDB = require("./config/database");
//use the routes/main file for mainRoutes
const mainRoutes = require("./routes/main");
//use the routes/posts file for postRoutes
const postRoutes = require("./routes/posts");

//Use the .env secret key config 
require("dotenv").config({ path: "./config/.env" });

// Use the passport config 
require("./config/passport")(passport);

// connect to the db
connectDB();

// make ejs the views 
app.set("view engine", "ejs");

// Use the static files in the public folder
app.use(express.static("public"));

// Body parser so only show important parts of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use morgan to log in console for debubbing
app.use(logger("dev"));

//Use methodOverrride to change form POST req to PUT or DELETE
app.use(methodOverride("_method"));

// Create cookies that are random and save these into the DB as sessions using MongoStore
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Start passport and start session
app.use(passport.initialize());
app.use(passport.session());

// Use flash for notifications on login/signup
app.use(flash());

// using express
// on "/", direct to the mainRoutes which the pathway is given above
// on "/post", direct to the postRoutes which the pathway is given above
app.use("/", mainRoutes);
app.use("/post", postRoutes);

// tell the server to run on the port that the hosting environment is requiring and display the server is running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
