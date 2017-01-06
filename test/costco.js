
const fs = require('fs')
const path = require('path')
const crawler = require('../src/crawler/costco')
const parser = require('../src/parser/costco')

let url = 'http://www.costco.com/Diamondback-Edgewood-Hybrid-Bike-2016.product.100242696.html'

crawler.fetch(url, {show: true}, function(err, html){
    if(err){
      console.log(err);
      return;
    }
    // console.log(html)
    let result = parser(html)

    console.log(result)
    fs.writeFileSync(path.join(__dirname, '../result/costco.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
})