const {fetchGoodsData} = require('../');


let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B005ODHIDK/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike&th=1&psc=1';

fetchGoodsData(url, {show: true},function(err, data){
    if(err){
        console.err("Error:" + err)
        return
    }
    console.log(JSON.stringify(data,null, 4))
});

