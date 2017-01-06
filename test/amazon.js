'use strict'

const fs = require('fs')
const path = require('path')

const amazon = require('../src/parser/amazon.js')

const {createNightmare} = require('../src/main_nightmare')

// let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B00BOR6I68/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike'
// let url = 'https://www.amazon.com/gp/product/B004MUEQ6S/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004MUEQ6S&linkCode=as2&tag=amz-pro-20&linkId=SUDHJFHPWF26Q2XR&th=1';
// let url = 'https://www.amazon.com/Notations-Womens-Sleeve-Pullover-Sweater/dp/B01JZSSR2A/ref=lp_15696779011_1_5?s=apparel&ie=UTF8&qid=1479779241&sr=1-5&nodeID=15696779011&th=1&psc=1'
let url = 'https://www.amazon.com/gp/product/B018SZT3BK/ref=s9_acsd_al_bw_c_odsbndea_3_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-1&pf_rd_r=JBH971KEJGQDE1JM7EF4&pf_rd_r=JBH971KEJGQDE1JM7EF4&pf_rd_t=101&pf_rd_p=85eb5ac7-965a-45ea-8a58-ee1b7fee448f&pf_rd_p=85eb5ac7-965a-45ea-8a58-ee1b7fee448f&pf_rd_i=11851273011';
let nightmare = createNightmare({show: true})
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
    return amazon(result)
  })
  .then(function(result){
    console.log(result)
    fs.writeFileSync(path.join(__dirname, '../result/amazon.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
  })
  .catch(function (error) {
    console.error('Search failed:', error)
  })