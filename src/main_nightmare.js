const Nightmare = require('nightmare')

function createNightmare(options){
  return Nightmare({
    show: options.show || false,
    openDevTools: {
      mode: 'detach'
    },
    webPreferences: {
      // preload: path.join(__dirname, "preload/jquery.js")
      images: false,
      // javascript: false,
    },
    loadTimeout: options.timeout || 38*1000 // in ms
  })
}


module.exports = {
    createNightmare: createNightmare
}