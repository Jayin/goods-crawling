
const cheerio = require('cheerio')
const _ = require('lodash')

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
  let imgs = $('#imgTagWrapperId img')

  // console.dir(imgs);
 if(imgs && imgs.length > 0){
      imgs.each(function (i, elem) {
        let img_url = $(this).attr('src')
        img_url = img_url.trim()
        if(img_url.indexOf('data:') === 0){
          img_url = $(this).data('old-hires')
        }

         if(!img_url || img_url == ''){
          let keys = _.keys($(this).data('a-dynamic-image'))
          if(keys && keys.length > 0){
            img_url = keys[0]
          }
        }
        images.push(img_url)
      })
  }

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
            'option': [],
            'code': [],
            'type': '', //【choose(选择框)、dropdown(下拉框)】
            'active': '', //选中项的序号，从0开始
            'available': [], //对应的选项是否可选
        }
        sku.label = $(this).find('div label').text().trim()
        //修正label尾部多处一个`：`冒号
        if(sku.label.endsWith(':')){
          sku.label = sku.label.substring(0, sku.label.length - 1)
        }

        //下拉框
        let $options = $(this).find('select option')
        if($options.length > 0){
            sku.type = 'dropdown'
            $options.each(function(i, elem){
                //忽略第一位(不是选项)
                if(i ==0 ){
                    return
                } 
                sku.option.push($(this).text().trim())

                //code
                let val = $(this).val().split(',');
                sku.code.push(val[1])

                //active
                if($(this).attr('data-a-css-class') == 'dropdownSelect'){
                  sku.active = i - 1; //因为第一位不是选项！
                }

                //该选项是否可选
                sku.available.push(true)

                // console.log($(this).text().trim())
                // $($('#twister > div')[0]).find('select option').each(function(i,e){console.log($(this).text().trim())})
            })
        }

        //选择框
        let $boxs = $(this).find('ul li');
        if($boxs.length > 0){
          sku.type = 'choose'
          $boxs.each(function(i, elm){
              let $imgs = $(this).find('img')
              if($imgs.length > 0){
                  let name = $imgs.attr('alt').trim()
                  sku.option.push(name)
              }else{
                let $buttons = $(this).find('button')
                if($buttons > 0){
                    let name = $buttons.text().trim()
                    sku.option.push(name)
                }
              }

              //code
              let code = $(this).attr('data-defaultasin'); 
              sku.code.push(code)

              //active
              if($(this).attr('class') == 'swatchSelect'){
                sku.active = i;
              }

              //该选项是否可选
              if($(this).attr('class') == 'swatchSelect' || $(this).attr('class') == 'swatchAvailable'){
                sku.available.push(true)
              }
              if($(this).attr('class') == 'swatchUnavailable'){
                sku.available.push(false)
              }
          })
        }

        if(sku.type != ''){
            // console.log(sku);process.exit();
            skus.push(sku)
        }
    })
  }
  return skus
}
/**
 * 获取价格
 */
function get_price(){
    let price = $('#priceblock_ourprice').text().trim()
    if(price == ''){
      price = $('#priceblock_dealprice').text().trim()
    }
    if(price == ''){
      price = $('#priceblock_saleprice').text().trim()
    }
    return price;
}
