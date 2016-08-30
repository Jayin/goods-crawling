'use strict'

const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio')




let content = fs.readFileSync(path.join(__dirname, 'tb.html'), {'encoding': 'utf-8'})
let $ =  cheerio.load(content)

$('img').each(function(i, elem){
    console.log($(this).attr('src'))
})
