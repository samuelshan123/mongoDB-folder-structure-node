const express = require("express");
const cors = require("cors");
const mongodb = require('mongodb');
const bodyParser = require('body-parser')
const { DB_URL } = require("./src/constants/constants");
const MongoClient = mongodb.MongoClient;  
const app = express();
const hbs = require('hbs')
const path =require('path')
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.set('views',path.join(__dirname,'./src/views'))

const location = path.join(__dirname,'./src/public')
const partialsPath =path.join(__dirname,'./src/views/partials')
hbs.registerPartials(partialsPath)
app.use(express.static(location));
app.set('view engine','hbs');


// const db = require("./app/models");
MongoClient
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async (client) => {
    const db = client.db('soverginity')
    Collections(db)
    // console.log( db.collection('users'));
    // module.exports = await {userCollection : db.collection('users')}
    // module.exports.DATA_BASE =client.db('soverginity')

    initRouter()
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


  function Collections(db){
      module.exports.objectCollection=db.collection('Objects')
      module.exports.circleCollection=db.collection('Circles')

  }

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the App v:1.0.0." });
  // let appname='sovergin'
  // res.render('welcome',{appname})
  // res.send('welcome')

});

function initRouter(){
  require("./src/routes/user.routes")(app);
  require("./src/routes/template.routes")(app)
  require("./src/routes/register.routes")(app)

}
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
