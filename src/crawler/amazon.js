const request = require('request')
const useragent = require('../lib/useragent')
const random_useragent = require('random-useragent')

function fetch (url, options, cb) {
  let opt = {
      url: url,
      headers: {
        'User-Agent': random_useragent.getRandom(function (ua) {
            // 取Chrome Firefox的PC浏览器
            let status = (ua.browserName == 'Chrome' || ua.browserName == 'Firefox')
            //  排除手机设备 不包含mobile，不含ios android 系统
            status = status && ua.deviceType != 'mobile'
            status = status && ua.folder.toLowerCase().indexOf('mobile') == -1
            status = status && ua.userAgent.toLowerCase().indexOf('mobile') == -1
            status = status && ua.description.toLowerCase().indexOf('mobile') == -1
            // 排除Android ios 系统
            status = status && ua.osName.toLowerCase().indexOf('android') == -1
            status = status && ua.osName.toLowerCase().indexOf('ios') == -1

            // 排除Spiders
            status = status && ua.folder.toLowerCase().indexOf('spiders') == -1

            return status
        }),
        'Host': 'www.amazon.com',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'identity',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
        'Cache-Control':'max-age=0',
        'Connection':'keep-alive',
      }
  }  
  request(opt, function (error, response, body) {
      if(error){
          return cb(error)
      }

      if(cb){
          cb(null, body)
      }
  })
}

module.exports = {
  fetch: fetch
}
