class databasePopulator {
  constructor() {
  }
  async populate(choice) {
    let array = await populateHome(choice);

    return array;

  }
  addUserEntry(Brand, Name, Image, Price, UserType) {
    useEntry(Brand, Name, Image, Price, UserType);
  }
  async findPriceRange(lowest, highest) {
    let array = await findItemsInPrice(lowest, highest);
    return array;
  }


}

function findItemsInPrice(lowest, highest) {
  //Import the mongoose module
  var mongoose = require('mongoose');

  //Set up default mongoose connection
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  var error = 'Something bad happened, try again!';
  //creates and saves a food instance

  const collection = db.collection('Collection0');
  return collection.find({ "price": { "$gte": lowest, "$lte": highest } }).toArray()
    .then(function (array) {
      return array;
    });


}
function useEntry(Brand, Name, Image, Price, UserType) {
  //Import the mongoose module
  var mongoose = require('mongoose');

  //Set up default mongoose connection
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  var error = 'Something bad happened, try again!';
  //creates and saves a food instance

  const collection = db.collection('Collection0');
  collection.find({ "name": Name }, { "brand": Brand }).count()
    .then(function (numItems) {
      if (numItems == 0) {
        collection.insertOne({ name: Name, image_link: Image, price: Price, brand: Brand, type: UserType }, (err, result) => {
        });
      }
    });




}

function populateHome(choice) {
  //Import the mongoose module
  var mongoose = require('mongoose');

  //Set up default mongoose connection
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  var error = 'Something bad happened, try again!';
  //creates and saves a food instance

  const collection = db.collection('Collection0');
  if (choice == 1) {
    // collection.deleteMany({});
  }//clears the db
  //collection.deleteMany({});
  const pageNumEngine = require('./public/Scraper/findNumPages.js')
  let NumPage = new pageNumEngine();
  const runScaper = require('./public/Scraper/scraper.js');

  let Scraper = new runScaper();
  return Scraper.readHMart(Scraper).then(function (altList) {
    if (choice == 1) {
      for (let j = 0; j < altList.length; j++) {
        var temp = altList[j];
        collection.find({ "name": temp.name }, { "brand": temp.brand }).count()
          .then(function (numItems) {
            if (numItems == 0) {
              var candyArray = ["candy", "jelly", "glaze", "sugarcoat", "sweets", "chocolate", "candies"];
              var cookiesArray = ["cookie", "cookies", "pocky", "biscuits", "biscuit", "choco","cracker","crackers"];
              var chipsArray = ["popcorn", "chip", "chips", "rings"];
              var fruitArray = ["fruit", "fruits", "strawberry", "blueberry", "banana", "watermelon", "peach", "orange", "durian"];
              var seafoodArray = ["seafood", "seafoods", "squid", "sardine","shrimp","kelp","seafood"];
              var meatArray = ["meat", "meats", "jerky", "beef", "pig", "pork", "cow", "chicken"];
              var m = false;
              for (var i = 0; i < candyArray.length; i++) {
                var n = temp.name.toLowerCase().includes(candyArray[i]);
                if (n == true && m == false) {
                  collection.insertOne({ name: temp.name, image_link: temp.image, price: temp.price, brand: temp.brand, type: 'Candy' }, (err, result) => { });
                  m = true;
                }
              }
              if (m == false) {
                for (var i = 0; i < cookiesArray.length; i++) {
                  var n = temp.name.toLowerCase().includes(cookiesArray[i]);
                  if (n == true && m == false) {
                    collection.insertOne({ name: temp.name, image_link: temp.image, price: temp.price, brand: temp.brand, type: 'Cookies' }, (err, result) => { });
                    m = true;
                  }
                }
              }
              if (m == false) {
                for (var i = 0; i < fruitArray.length; i++) {
                  var n = temp.name.toLowerCase().includes(fruitArray[i]);
                  if (n == true && m == false) {
                    collection.insertOne({ name: temp.name, image_link: temp.image, price: temp.price, brand: temp.brand, type: 'Fruit' }, (err, result) => { });
                    m = true;
                  }
                }
              }
              if (m == false) {
                for (var i = 0; i < chipsArray.length; i++) {
                  var n = temp.name.toLowerCase().includes(chipsArray[i]);
                  if (n == true && m == false) {
                    collection.insertOne({ name: temp.name, image_link: temp.image, price: temp.price, brand: temp.brand, type: 'Chips' }, (err, result) => { });
                    m = true;
                  }
                }
              }
              if (m == false) {
                for (var i = 0; i < seafoodArray.length; i++) {
                  var n = temp.name.toLowerCase().includes(seafoodArray[i]);
                  if (n == true && m == false) {
                    collection.insertOne({ name: temp.name, image_link: temp.image, price: temp.price, brand: temp.brand, type: 'Seafood' }, (err, result) => { });
                    m = true;
                  }
                }
              }
              if (m == false) {
                for (var i = 0; i < meatArray.length; i++) {
                  var n = temp.name.toLowerCase().includes(meatArray[i]);
                  if (n == true && m == false) {
                    collection.insertOne({ name: temp.name, image_link: temp.image, price: temp.price, brand: temp.brand, type: 'Meat' }, (err, result) => { });
                    m = true;
                  }
                }
              }
              if (m == false) {
                collection.insertOne({ name: temp.name, image_link: temp.image, price: temp.price, brand: temp.brand, type: 'Misc.' }, (err, result) => { });
              }
            }
         });

      }
    }
    var results = collection.find().toArray();
    return results;
  });


}


module.exports = databasePopulator;