const express = require("express");
const app = express();
const cors = require('cors')
const connectDB = require("./config/database");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Connect To Database
const db = connectDB();

// Cors
app.use(cors())

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/api/:playerName', (request, response) => {
  const infoCollection = db.collection('player-info')
  const playerName = request.params.playerName.toLowerCase()
  
  infoCollection.findOne({name: playerName})
    .then(result => {
      console.log(result)
      response.json(result)
    })
    .catch(error => console.error(error))
})

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
