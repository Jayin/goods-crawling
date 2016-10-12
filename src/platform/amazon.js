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
/**
 * 获取图片列表
 */
function get_images () {
  let images = []
  let imgs = $('#altImages img')
  imgs.each(function (i, elem) {
    images.push($(this).attr('src'))
  })
  return images
}
/**
 * 获取商品标题
 */
function get_title () {
  return $('#productTitle').text().trim()
}
/**
 * 获取商品品牌
 */
function get_banner () {
  return $('#brand').text().trim()
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
/**
 * 获取价格
 */
function get_price(){
    return $('#priceblock_ourprice').text().trim()
}
