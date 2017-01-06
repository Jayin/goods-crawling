'use strict'

const fs = require('fs')
const path = require('path')

const bestbuy = require('../src/parser/bestbuy.js')

const {createNightmare} = require('../src/main_nightmare')

let url = 'http://www.bestbuy.com/site/apple-iphone-7-128gb-silver/5580373.p?id=bb5580373&skuId=5580373'
let nightmare = createNightmare({show: false})
nightmare
  .useragent('Chrome')

  .goto(url)
  // .type('form[action*="/search"] [name=p]', 'github nightmare')
  // .click('form[action*="/search"] [type=submit]')
  // .wait('#main')
  // .inject('js', path.join(__dirname, "preload/jquery.js"))
  // .wait('#brand')
  .end()
  .evaluate(function () {
    return document.documentElement.outerHTML
  })
  .then(function (result) {
    // console.log(result)
    // fs.writeFileSync(path.join(__dirname, 'tb.html'), result, {encoding: 'utf8'})
    return bestbuy(result)
  })
  .then(function(result){
    console.log(result)
    fs.writeFileSync(path.join(__dirname, '../result/bestbuy.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
  })
  .catch(function (error) {
    console.error('Search failed:', error)
  })
