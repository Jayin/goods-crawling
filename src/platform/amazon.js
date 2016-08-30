'use strict'

const cheerio = require('cheerio')

let content = ''
let $ = null

module.exports = function (html) {
  content = html
  $ = cheerio.load(html)

  //   this.goods.title = $('#title').text().trim()
  //   goods.brand = $('#brand').text().trim()

  let goods = {
    'title': get_title(),
    'brand': get_banner(),
    'description': '',
    'images': get_images(),
    'attr': [],
    'sku': get_sku(),
    'price': get_price()

  }
  return goods
}

function get_images () {
  let images = []
  let imgs = $('#altImages img')
  imgs.each(function (i, elem) {
    images.push($(this).attr('src'))
  })
  return images
}

function get_title () {
  return $('#productTitle').text().trim()
}

function get_banner () {
  return $('#brand').text().trim()
}

function get_sku () {
  let skus = [];
//   console.log($('#twister>div'))   
  let $skus = $('#twister > div')
  
  if ($skus) {
    $skus.each(function () {
        let sku = {
            'label': '',
            'option': []
        }
        sku.label = $(this).find('div label').text()

        let $options = $(this).find('select option')
        if($options){
            $options.each(function(i, elem){
                //忽略第一位(不是选项)
                if(i ==0 ){
                    return
                } 
                sku.option.push($(this).text().trim())
                // console.log($(this).text().trim())
                // $($('#twister > div')[0]).find('select option').each(function(i,e){console.log($(this).text().trim())})
            })
        }
        // console.log(sku);process.exit();
       skus.push(sku)
    //   console.log($(this).find('div label').text())
    })
  }
  return skus
}

function get_price(){
    return $('#priceblock_ourprice').text().trim()
}
