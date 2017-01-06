'use strict'

const fs = require('fs')
const path = require('path')

const sixpm = require('../src/parser/sixpm.js')

const {createNightmare} = require('../src/main_nightmare')

let url = 'http://www.6pm.com/u-s-polo-assn-slim-straight-corduroy-five-pocket-jeans-in-mood-indigo-mood-indigo'
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
    return sixpm(result)
  })
  .then(function(result){
    console.log(result)
    fs.writeFileSync(path.join(__dirname, '../result/sixpm.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
  })
  .catch(function (error) {
    console.error('Search failed:', error)
  })
