const express = require("express"); //helps build out API
const app = express();
const mongoose = require("mongoose"); //helps us talk to our MONGO DB
const passport = require("passport"); //uses for authentication. Strats for logins
const session = require("express-session"); //allows users to stay logged in across app
const MongoStore = require("connect-mongo")(session); //stores our actual session in MONGO DB
const methodOverride = require("method-override"); //allows us to use GET & POST throughout our entire app but treat them as PUT & DELETE as needed to do different things
const flash = require("express-flash"); //shows all our notifications
const logger = require("morgan"); //logs & shows everything happening in console
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
app.set("view engine", "ejs"); //server now expects EJS files to be whats used to spit out our VIEWS

//Static Folder
app.use(express.static("public")); //for any static assets(CSS,JS,IMGS) files

//Body Parsing - allows us to pull stuff out of requests being made (like when submitting a form and pulling the data out of those forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging - using MORGAN to log requests in console
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method")); //allows to OVERRIDE any request that comes to server

//Setup Sessions - stored in MongoDB - needed for session to be implimented
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware - helps with authentication, allows user to stay logged in
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes); //routes for homepage,login,signup
app.use("/post", postRoutes); //routes for individual posts,feed,profile
//app.use("/comment", commentRoutes); //routes for comments


//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}/`);
});
