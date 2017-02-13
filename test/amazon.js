const fs = require('fs')
const path = require('path')
const crawler = require('../src/crawler/amazon')
const parser = require('../src/parser/amazon')

//未选择
// let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B00BOR6I68/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike'
//已选择
// let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B0071XBI5A/ref=twister_B000P6GKOO?_encoding=UTF8&th=1&psc=1'
// let url = 'https://www.amazon.com/gp/product/B004MUEQ6S/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004MUEQ6S&linkCode=as2&tag=amz-pro-20&linkId=SUDHJFHPWF26Q2XR&th=1';
// let url = 'https://www.amazon.com/Notations-Womens-Sleeve-Pullover-Sweater/dp/B01JZSSR2A/ref=lp_15696779011_1_5?s=apparel&ie=UTF8&qid=1479779241&sr=1-5&nodeID=15696779011&th=1&psc=1'
// let url = 'https://www.amazon.com/gp/product/B018SZT3BK/ref=s9_acsd_al_bw_c_odsbndea_3_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-1&pf_rd_r=JBH971KEJGQDE1JM7EF4&pf_rd_r=JBH971KEJGQDE1JM7EF4&pf_rd_t=101&pf_rd_p=85eb5ac7-965a-45ea-8a58-ee1b7fee448f&pf_rd_p=85eb5ac7-965a-45ea-8a58-ee1b7fee448f&pf_rd_i=11851273011';
// let url = 'https://www.amazon.com/Pebble-501-00020-Time-Smartwatch-Black/dp/B0106IS5XY?th=1';
// let url = 'https://www.amazon.com/gp/product/B018SZT3BK';
let url = 'https://www.amazon.com/dp/B00GMK92Y2?tag=lustr0a5920-20';
// let url = 'https://www.amazon.com/PREMIUM-Mens-Polo-Shirts-Sleeves/dp/B01LTBEFJK/ref=pd_sim_193_5?_encoding=UTF8&psc=1&refRID=D3XJQMDWT1BPKB2ZY7BS';

crawler.fetch(url, {show: true}, function(err, html){
    if(err){
      console.log(err);
      return;
    }
    // console.log(html)
    // html.
    // fs.writeFileSync(path.join(__dirname, '../result/amazon.json'), html, {encoding: 'utf8'})
    let result = parser(html)

    console.log(result)
    if(result.title == ''){
      console.log(html)
      fs.writeFileSync(path.join(__dirname, '../result/amazon_error.html'), html, {encoding: 'utf8'})
      return
    }
    fs.writeFileSync(path.join(__dirname, '../result/amazon.json'), JSON.stringify(result,null, 4), {encoding: 'utf8'})
})

  