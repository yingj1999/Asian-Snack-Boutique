class Scraper {
  constructor() {
  }

  doScraperWithPageNumHmart(PageNum) {
    var url = 'https://www.hmart.com/groceries/snacks';
    url = url.concat('?p=');
    var urlUpdated = url.concat(PageNum);
    return doScraper(urlUpdated).then(function (altList) {
      return altList;

    })
      .catch(function (err) {
        console.log("Error");
      });

  }
  async readHMart(Scraper) {
    const pageNumEngine = require('./findNumpages.js');
    const rp = require('request-promise');
    let NumPage = new pageNumEngine();
    let numberofPages = await NumPage.findNumpages('https://www.hmart.com/groceries/snacks');
    var j;
    var foodsAltDescription = [];
    for (j = 0; j <= numberofPages; j++) {   //this loop allows us to read all 3 pages of the website
      var k = j + 1;
      let array = await Scraper.doScraperWithPageNumHmart(k);
      foodsAltDescription = foodsAltDescription.concat(array);
    }
    return foodsAltDescription;


  }

  
}


function doScraper(url) {
  const rp = require('request-promise');
  const $ = require('cheerio');

  const hmartFoodArray = [];

  return rp(url)
    .then(function (html) {
      //success!

      //used to get the product name
      $('img[class=product-image-photo]', html).each(function (i, elem) {
        temp = {
          name: '',
          brand: '',
          price: '',
          image: '',
          type: ''
        };
        temp.name = $(this).attr('alt');
        hmartFoodArray[i] = temp;
      });


      //used to get the product brand
      $('span[class=product-brand-flag]', html).each(function (i, elem) {
        temp = hmartFoodArray[i];
        var brand = $(elem).text();
        brand = brand.replace(/\s/g, '');
        brand = brand.replace('\n', '');
        temp.brand = brand
        hmartFoodArray[i] = temp;
      });
      //used to get the product price

      $('span[data-price-type= finalPrice]', html).each(function (i, elem) {
        temp = hmartFoodArray[i];
        var price =$(this).attr('data-price-amount');     
        temp.price = price;
        hmartFoodArray[i] = temp;
      });

      //used to get the image link
      $('img[class=product-image-photo]', html).each(function (i, elem) {
        temp = hmartFoodArray[i];
        temp.image = $(this).attr('src');
        hmartFoodArray[i] = temp;
      });





      //console.log(hmartFoodArray);
      return hmartFoodArray;
    })




    .catch(function (err) {
      temp = hmartFoodArray[i];
      var price='unknown';
      temp.price = price;
      hmartFoodArray[i] = temp;
      console.log(err);
    });
}


module.exports = Scraper;



/*
async readHMart(Scraper) {
  const pageNumEngine = require('./findNumpages.js');
  const rp = require('request-promise');
  let NumPage = new pageNumEngine();




   NumPage.findNumpages('https://www.hmart.com/groceries/snacks').then(function (numberofPages) {

    var url = 'https://www.hmart.com/groceries/snacks';
    url = url.concat('?p=');
    var j;
    var foodsAltDescription=[];
    for (j = 0; j <= numberofPages; j++) {   //this loop allows us to read all 3 pages of the website
      var k = j + 1;
      var urlUpdated = url.concat(k);
      Scraper.doScraper(urlUpdated).then(function (altList) {
        foodsAltDescription = foodsAltDescription.concat(altList);
        if (j = numberofPages){
          //console.log(foodsAltDescription);
          return foodsAltDescription;
        }
      });
    }
    return foodsAltDescription;
  });


}
}*/