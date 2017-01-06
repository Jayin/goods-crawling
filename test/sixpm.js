
const fs = require('fs')
const path = require('path')
const crawler = require('../src/crawler/sixpm')
const parser = require('../src/parser/sixpm')

let url = 'http://www.6pm.com/u-s-polo-assn-slim-straight-corduroy-five-pocket-jeans-in-mood-indigo-mood-indigo'

crawler.fetch(url, {show: true}, function(err, html){
    if(err){
      console.log(err);
      return;
    }
    // console.log(html)
    let result = parser(html)

    console.log(result)
    fs.writeFileSync(path.join(__dirname, '../result/sixpm.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
})
