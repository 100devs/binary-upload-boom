const express = require("express"); //helps us build out our API
const app = express();
const mongoose = require("mongoose"); //helps us talk to our MONGO DB
const passport = require("passport"); //uses for authentication. Strats for logins
const session = require("express-session"); //allows users to stay logged in across app
const MongoStore = require("connect-mongo")(session); //stores our actual session in MONGO DB
const methodOverride = require("method-override"); //allows us to use GET & POST throughout our entire app but treat them as PUT & DELETE as needed to do different things
const flash = require("express-flash"); //shows all our notifications
const logger = require("morgan"); //logs everything happening in console
const connectDB = require("./config/database"); //connects to our DB
const mainRoutes = require("./routes/main"); //routes for homepage,login,signup
const postRoutes = require("./routes/posts"); //routes for individual posts,feed,profile
//const commentRoutes = require("./routes/comments"); //routes for comments

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
//app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
