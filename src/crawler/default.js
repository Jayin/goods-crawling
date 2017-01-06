
/**
 * 默认用electron 渲染
 */

const useragent = require('../lib/useragent')
const {createNightmare} = require('../main_nightmare')

function fetch(url, options, cb){
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
        // .then(function (result) {
        //     // console.log(result)
        //     // fs.writeFileSync(path.join(__dirname, 'tb.html'), result, {encoding: 'utf8'})
        //     return {
        //         data: parser[_platform](result),
        //         platform: _platform
        //     }
        // })
        //只获取html
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


module.exports = {
    fetch : fetch
}