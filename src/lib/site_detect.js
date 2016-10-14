
/**
 * 检测网站类型
 */
module.exports = function(url){
    if(url.indexOf('amazon.com') > 0){
        return 'amazon'
    }
    if(url.indexOf('bestbuy.com') > 0){
        return 'bestbuy'
    }
    if(url.indexOf('costco.com') > 0){
        return 'costco'
    }
    if(url.indexOf('6pm.com') > 0){
        return 'sixpm'
    }

};