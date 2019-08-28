const express = require('express');//grabs our express engine
const bodyParser = require('body-parser');//allows us to use the middle ware function which has access to the req and res
const app = express();
const rp = require('request-promise');

app.use(express.static('public'));//allows us to get everything in public folder, such as css
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//allows us to read body of html
app.set('view engine', 'ejs');


const dbPopulator = require('./databasePopulator.js');

let populator = new dbPopulator();
app.locals.products = [{}];
app.get('/', function (req, res) {//this displays my index html
  var first = 1;
  populator.populate(first).then(function (array) {
    app.locals.products = array;

  });
  setTimeout(function () {
    res.render('index');
  }, 20011);
});




app.post('/userSearch', function (req, res) {//when we visit the root url, this get our entered city
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("local_library").collection("Collection0");
    // perform actions on the collection object
    var results=[];
     collection.find({name: { "$regex": req.body.snack, "$options": "i" }}).toArray().then(function(array) {
          results = array;
        });
        collection.find({brand: { "$regex": req.body.snack, "$options": "i" }}).toArray().then(function(array) {
           client.close();
           app.locals.products = results.concat(array);
           res.render('index.ejs');
         });

  });
});

app.post('/priceResults', function (req, res) {//this is for getting out price range

  populator.findPriceRange(req.body.lowestPrice, req.body.highestPrice).then(function (array) {
    app.locals.products = array;
  });
  setTimeout(function () {
    res.render('index.ejs');
  }, 300);
});

app.post('/enteredSnack', function (req, res) {//this is used for getting the added snack info
  populator.addUserEntry(req.body.Brand, req.body.Name, req.body.Image, req.body.Price, req.body.UserType);
  var second = 2;
  populator.populate(second).then(function (array) {
    app.locals.products = array;
  });
  setTimeout(function () {
    res.render('index.ejs');
  }, 20000);
})

//use this to document when the value changes
const UserChoice = require('./public/Objects/UserChoice.js');
// create an instance of your object
var snackType = new UserChoice();

// listen for changes
snackType.on("change:selection", function (selection) {
  //console.log("selection changed to:", selection);

});
app.post('/typeResults', function (req, res) {
  snackType.selection = req.body.Type;
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("local_library").collection("Collection0");
        collection.find({type:req.body.Type}).toArray().then(function(array) {
           client.close();
           app.locals.products = array;
           res.render('index.ejs');
         });

  });
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})




