'use strict'

const fs = require('fs')
const path = require('path')

const amazon = require('./platform/amazon.js')

const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  webPreferences: {
    // preload: path.join(__dirname, "preload/jquery.js")
  },
  //  loadTimeout: 5000 // in ms
})

let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B00BOR6I68/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike'
nightmare
  .useragent('Chrome')

  .goto(url)
  // .type('form[action*="/search"] [name=p]', 'github nightmare')
  // .click('form[action*="/search"] [type=submit]')
  // .wait('#main')
  // .inject('js', path.join(__dirname, "preload/jquery.js"))
  // .wait('#brand')
  // .wait('#productTitle')
  .end()
  .evaluate(function () {
    return document.documentElement.outerHTML
  })
  .then(function (result) {
    // console.log(result)
    // fs.writeFileSync(path.join(__dirname, 'tb.html'), result, {encoding: 'utf8'})
    return amazon(result)
  })
  .then(function(result){
    console.log(result)
    fs.writeFileSync(path.join(__dirname, 'amazon.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
  })
  .catch(function (error) {
    console.error('Search failed:', error)
  })
