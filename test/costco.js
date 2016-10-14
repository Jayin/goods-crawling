'use strict'

const fs = require('fs')
const path = require('path')

const costco = require('../src/platform/costco.js')

const {createNightmare} = require('../src/main_nightmare')

let url = 'http://www.costco.com/Hudson-River-Men%E2%80%99s-Short-Sleeve-Button-Down-Shirt.product.100246505.html'
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
    return costco(result)
  })
  .then(function(result){
    console.log(result)
    fs.writeFileSync(path.join(__dirname, '../result/costco.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
  })
  .catch(function (error) {
    console.error('Search failed:', error)
  })
