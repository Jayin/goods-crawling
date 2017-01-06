const {fetchGoodsData} = require('../');


let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B00BOR6I68/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike';

fetchGoodsData(url, {show: true},function(err, data){
    if(err){
        console.err("Error:" + err)
        return
    }
    console.log(JSON.stringify(data,null, 4))
});

