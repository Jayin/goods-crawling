const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: false,
  openDevTools: {
    mode: 'detach'
  },
  webPreferences: {
    // preload: path.join(__dirname, "preload/jquery.js")
    images: false,
    // javascript: false,
  },
   loadTimeout: 28*1000 // in ms
})


module.exports = {
    nightmare: nightmare
}