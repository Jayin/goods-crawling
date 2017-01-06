const request = require('request')
const useragent = require('../lib/useragent')
const random_useragent = require('random-useragent')

function fetch (url, options, cb) {
  let opt = {
      url: url,
      headers: {
        'User-Agent': random_useragent.getRandom(function(ua){
            //取linux + windows 的浏览器
            return ua.osName == 'Windows' || ua.osName == 'Linux' || ua.browserName == 'Chrome' || ua.browserName == 'Firefox';
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
