class NumPagesEngine {
    constructor() {
    }
  
    async findNumpages(url) {
      const rp = require('request-promise');
      const $ = require('cheerio');
  
      //var pagesLength = 0
      //We need to find the number of pages, and thenn loop through them to scrape data
  
      return rp(url)
        .then(function (html) {
          //success!
          var pagesLength = $('a[class=page]', html).length;//find the number of pages
          pagesLength = pagesLength / 2;
          return pagesLength;
        })
        .catch(function (err) {
          console.log("Error");
        });
        
    }
  }
  
  module.exports = NumPagesEngine;
  