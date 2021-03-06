
const site_detect = require('shopping_site_detect')
const {createNightmare} = require('./main_nightmare')
const fs = require('fs')
const path = require('path')
const parsers = {
    amazon: require('./parser/amazon'),
    sixpm: require('./parser/sixpm'),
    bestbuy: require('./parser/bestbuy'),
    costco: require('./parser/costco'),
}
const crawlers = {
    amazon: require('./crawler/amazon'),
    sixpm: require('./crawler/sixpm'),
    bestbuy: require('./crawler/bestbuy'),
    costco: require('./crawler/costco'),
}

function fetchGoodsData(url, options, cb) {
    let _platform = site_detect(url);
    
    crawlers[_platform].fetch(url, options, function(err, html){
        if(err){
            return cb(err)
            
        }
        let data = parsers[_platform](html)
        let ret = {
            data: data,
            platform: _platform
        }
        cb(null, ret)
        
    })

}
/**
 * 获取商品数据
 */
module.exports = {
    fetchGoodsData: fetchGoodsData,
}
