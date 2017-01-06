'use strict'

const cheerio = require('cheerio')

let content = ''
let $ = null

module.exports = function (html) {
  content = html
  $ = cheerio.load(html)

  let goods = {
    'title': get_title(),
    'brand': get_banner(),
    'description': get_description(),
    'images': get_images(),
    'attr': [],
    'sku': get_sku(),
    'price': get_price()

  }
  return goods
}
/**
 * 获取图片列表
 */
function get_images () {
  let images = []
  let imgs = $('#detailImage img')
  imgs.each(function (i, elem) {
    images.push($(this).attr('src'))
  })
  return images
}
/**
 * 获取商品标题
 */
function get_title () {
  return $('h1.title').text().trim()
}
/**
 * 获取商品品牌
 */
function get_banner () {
  return ''
}
/**
 * 描述
 */
function get_description (){
    return ''
}
/**
 * 获取sku
 */
function get_sku () {
  let skus = [];
//   console.log($('#twister>div'))   
  let $skus = $('.wingInfo li')
  
  if ($skus) {
    $skus.each(function () {
        let sku = {
            'label': '',
            'option': []
        }
        if($(this).find('label').text().trim() == ''){
          return;
        }

        sku.label = $(this).find('label').text().trim().split(':')[0]

        let $options = $(this).find('select option')
        if($options){
            $options.each(function(i, elem){
         
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
/**
 * 获取价格
 */
function get_price(){
    return $('#priceSlot .price').text().trim()
}
