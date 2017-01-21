const request = require('request')
const useragent = require('../lib/useragent')

function fetch (url, options, cb) {
  let opt = {
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
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
