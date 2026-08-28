const express = require("express"); // import express
const app = express(); // create an express application
const mongoose = require("mongoose"); // import mongoose
const passport = require("passport"); // import passport
const session = require("express-session"); // import sessions to allow server to remember information about a user between requests
const MongoStore = require("connect-mongo")(session); // configures sessions to be stored in mongodb
const methodOverride = require("method-override"); // lets a post form pretend to be a put or delete request using method overide
const flash = require("express-flash"); // allows flash messages
const logger = require("morgan"); // allows morgan logger to log incoming http requests
const connectDB = require("./config/database"); // imports database conection function
const mainRoutes = require("./routes/main"); // imports main route
const postRoutes = require("./routes/posts"); // imports post route
const commentRoutes = require("./routes/comments"); // import comments route

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); // loads environment variables from .env folder

// Passport config
require("./config/passport")(passport); // passport configuration

//Connect To Database
connectDB(); // connects server to db

//Using EJS for views
app.set("view engine", "ejs"); // tells express to use ejs

//Static Folder
app.use(express.static("public")); //tells express files inside public folder can be sserved directly to the browser

//Body Parsing
app.use(express.urlencoded({ extended: true })); // parse ford data
app.use(express.json()); // parse json allowing express to understand json request bodies

//Logging
app.use(logger("dev")); // activates morgan so incoming requests are logged

//Use forms for put / delete
app.use(methodOverride("_method")); // activates method override 

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET, // secret used by session system to sign/encrypt session related info
    resave: false, // don't resave unchanged sessions
    saveUninitialized: false, // don't save empty files
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // store sessions in mongodb
  })
);

// Passport middleware
app.use(passport.initialize()); // passport initilization
app.use(passport.session()); // tells passport to use the express session system to maintain authentication across requests

//Use flash messages for errors, info, ect...
app.use(flash()); // activates flash middleware

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes); // tells express to use mainRoutes whenever the url starts with /
app.use("/post", postRoutes); // mounts post routes, adds /post to beginning of router routes
app.use("/comment", commentRoutes); // mounts comment routes, adds /comment to beginning of router routes

//Server Running
app.listen(process.env.PORT, () => { // starts the server
  console.log("Server is running, you better catch it!");
});
