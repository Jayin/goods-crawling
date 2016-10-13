
/**
 * 检测网站类型
 */
module.exports = function(url){
    if(url.indexOf('amazon.com')){
        return 'amazon'
    }
    if(url.indexOf('bestbuy.com')){
        return 'bestbuy'
    }
    if(url.indexOf('costco.com')){
        return 'costco'
    }
    if(url.indexOf('6pm.com')){
        return 'sixpm'
    }

};