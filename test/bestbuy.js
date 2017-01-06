
const fs = require('fs')
const path = require('path')
const crawler = require('../src/crawler/bestbuy')
const parser = require('../src/parser/bestbuy')

let url = 'http://www.bestbuy.com/site/apple-iphone-7-128gb-silver/5580373.p?id=bb5580373&skuId=5580373'

crawler.fetch(url, {show: true}, function(err, html){
    if(err){
      console.log(err);
      return;
    }
    // console.log(html)
    let result = parser(html)

    console.log(result)
    fs.writeFileSync(path.join(__dirname, '../result/bestbuy.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
})
