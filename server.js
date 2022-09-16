const express = require("express");                   // imports the express package, which facilitates server creation and handling
const app = express();                                // makes an instance of express and storing it in a constant app
const mongoose = require("mongoose");                 // imports the mongoose package, which helps us create a schema for our data and communicating with MongoDB
const passport = require("passport");                 // imports the passport package, which helps us with adding an authentication feature
const session = require("express-session");           // imports the session package, which helps us with session creation and handling
const MongoStore = require("connect-mongo")(session); // imports the connect-mongo package, which allows us to create a session connection to the DB
const methodOverride = require("method-override");    // imports the method-override package, which allows us to override the POST method in a form to be able to use PUT & DELETE instead.
const flash = require("express-flash");               // imports the flash package, which allows us to define a flash message and render it without redirecting the request
const logger = require("morgan");                     // imports the morgan package, which allows http request logging
const connectDB = require("./config/database");       // imports the DB connection configuration from the config/database file
const mainRoutes = require("./routes/main");          // imports the main routes from the routes/main file 
const postRoutes = require("./routes/posts");         // imports the post routes from the routes/post file

//Use .env file in config folder to keep all sensitive information secure 
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

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
