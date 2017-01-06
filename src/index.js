
const site_detect = require('./lib/site_detect')
const useragent = require('./lib/useragent')

const {createNightmare} = require('./main_nightmare')
const fs = require('fs')
const path = require('path')

const parser = {
    amazon: require('./parser/amazon'),
    sixpm: require('./parser/sixpm'),
    bestbuy: require('./parser/bestbuy'),
    costco: require('./parser/costco'),
}

function fetchGoodsData(url, options, cb) {
    let _platform = site_detect(url);
    
    let nightmare = createNightmare(options)
    nightmare
        .useragent(useragent())
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
            return {
                data: parser[_platform](result),
                platform: _platform
            }
        })
        .then(function (result) {
            // console.log(result)
            // fs.writeFileSync(path.join(__dirname, '../result/'　+ _platform　+ '.json'), JSON.stringify(result, null, 4), { encoding: 'utf8' })
            if (cb) {
                cb(null, result)
            }
        })
        .catch(function (error) {
            if (cb) {
                cb(error)
            }
        })


}
/**
 * 获取商品数据
 */
module.exports = {
    fetchGoodsData: fetchGoodsData,
}
