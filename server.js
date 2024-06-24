//the require statements that are used here are used to import the modules that are needed for the server to run properly and to connect to the database and to the routes

const express = require("express"); // express is used here in server.js to create the server, handle the routes, and listen for requests from the client side of the application (the browser)
const app = express(); //app is the server object that is created from the express module, express() is a function that creates the server object

// more structured than mongo as a way of organizing your database; works with schemas
const mongoose = require("mongoose");  //the purpose of mongoose is to structure the data in the database, it is used to create models and schemas for the data in the database, it is better than mongodb because it is more structured and easier to work with
const passport = require("passport"); //passport is used here to authenticate users, it is used in the server.js file to set up the authentication middleware, passport.js is great because it allows you to authenticate users using a variety of different strategies, in this case we are using the local strategy which means that we are authenticating users using a username and password
const session = require("express-session"); //express-session is used here to create a session for the user, a session is a way of storing data on the server side of the application, in this case we are using it to store the user's information so that we can access it later on in the application (for example, we can use it to display the user's name on the page)
const MongoStore = require("connect-mongo")(session); //connect-mongo is used here to store the session in the database, this is useful because it allows us to access the session data from anywhere in the application, in this case we are using it to store the user's information in the database so that we can access it later on in the application (for example, we can use it to display the user's name on the page)
// lets you use http CRUD put and delete requests
const methodOverride = require("method-override"); //method-override is used here to override the default method of a request, for example, if you want to use a put request to update a post, you can use method-override to override the default method of the request to put so that you can update the post
const flash = require("express-flash"); //express-flash is used here to display flash messages, flash messages are messages that are displayed to the user when they perform an action, for example, if the user tries to log in with the wrong password, we can display a flash message to let them know that they entered the wrong password
const logger = require("morgan"); //morgan is used here to log requests to the console, this is useful because it allows you to see what requests are being made to the server, for example, if you are trying to debug a problem with your application, you can use morgan to see what requests are being made to the server and what the responses are
const connectDB = require("./config/database"); //connectDB is used here to connect to the database, this is useful because it allows you to connect to the database from anywhere in the application, in this case we are using it to connect to the database in the server.js file so that we can access the database from anywhere in the application
const mainRoutes = require("./routes/main"); //importing main routes.js file to use the routes in the server.js file
const postRoutes = require("./routes/posts"); //importing post routes.js file to use the routes in the server.js file
const commentRoutes = require("./routes/comments"); //

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); //dotenv is used here to load environment variables from a .env file into process.env, this is useful because it allows you to store sensitive data in a file that is not tracked by git, in this case we are using it to store the database connection string in a .env file so that we can connect to the database

// Passport config
require("./config/passport")(passport); //importing passport.js file to use the passport configuration in the server.js file, (passport) is used here to pass the passport object to the passport.js file so that we can use it in the passport.js file, (passport) is the passport object that is created in the server.js file

//Connect To Database
connectDB(); //connectDB is used here after the database connection string has been loaded into process.env

//Using EJS for views
app.set("view engine", "ejs"); //app.set is used here to set the view engine to ejs, the purpose of app.set is to set a value for a setting, in this case we are setting the view engine to ejs so that we can use ejs to render our views

//Static Folder
//app.use is to tell the express server to use a piece of middleware

app.use(express.static("public")); //app.use is used here to use the public folder as a static folder, the purpose of app.use is to use middleware, in this case we are using the public folder as a static folder so that we can use it to store static files like css, images, and javascript files

//Body Parsing
app.use(express.urlencoded({ extended: true })); //the purpose of express.urlencoded is to parse incoming requests with urlencoded payloads, in this case we are using it to parse incoming requests with urlencoded payloads so that we can access the data from the request body
app.use(express.json()); //the purpose of express.json is to parse incoming requests with JSON payloads, in this case we are using it to parse incoming requests with JSON payloads so that we can access the data from the request body

//Logging
app.use(logger("dev")); //we are using logger("dev") here to log requests to the console, "dev" being the format of the logs, the development format is used here because it is easier to read than the default format

//Use forms for put / delete
app.use(methodOverride("_method")); //we are telling the server to use method-override here so that we can override the default method of a request, in this case we are using it to override the default method of a request so that we can use a put request to update a post

// Setup Sessions - stored in MongoDB
app.use(
    //we are telling the server to use express-session here so that we can create a session for the user, in this case we are using it to create a session for the user so that we can store the user's information in the session
  session({
    secret: "keyboard cat", //the secret is used to sign the session ID cookie,
    resave: false, //resave: false means that the session will not be resaved if nothing has changed, what this means is that if the session is not modified, it will not be resaved to the store (in this case the database), using resave here is useful because it allows you to save memory and bandwidth by not resaving the session if nothing has changed
    saveUninitialized: false, //saveUninitialized: false means that a session with no data will not be saved to the store (in this case the database),
    store: new MongoStore({ mongooseConnection: mongoose.connection }), //we are creating a new MongoStore object here and passing it to the store property of the session object, the purpose of the MongoStore object is to store the session in the database
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); //the purpose of passport.session() is to persist login sessions, in this case we are using it to persist login sessions so that the user does not have to log in every time they visit the site

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
//Here we need to tell the server which routes to listen for
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

//Server Running On Port 3000 (localhost:3000) - http://localhost:3000/
//Lastly we need to tell the server which port to listen on and what to do when the server is running on that port (in this case we are logging a message to the console)
//the purpose of listen is to start a UNIX socket and listen for connections on the given path, in this case we are telling the server to listen on port 3000 and to log a message to the console when the server is running on port 3000
//A UNIX socket is started here because we are using the http module to create the server, if we were using the https module to create the server, a TCP socket would be started instead
//the http module is used from the node.js core modules, the purpose of a UNIX socket is to allow two processes to communicate with each other, in this case we are using a UNIX socket to allow the server to communicate with the client
//how a UNIX socket works is that the server creates a socket file in the file system and listens for connections on that socket file, when a client connects to the server, the server creates a new socket file for that client and the client and server can communicate with each other using that socket file
//how this socket allows the server and client to communicate with each other is that the server can send data to the client using the socket file and the client can send data to the server using the socket file
//this data can be anything, in this case we are sending html files to the client
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
