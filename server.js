const express = require("express");
const cors = require("cors");
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const app = express();
const url= "mongodb://localhost:27017"

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
MongoClient
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async (client) => {
    // const db = client.db('students')
    // console.log( db.collection('users'));
    // module.exports = await {userCollection : db.collection('users')}
    module.exports.data_base =client.db('students')
    initRouter()
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node application." });
});

function initRouter(){
  require("./app/routes/user.routes")(app);

}
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
