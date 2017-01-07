## goods-crawling [![Version](https://img.shields.io/npm/v/goods-crawling.svg)](https://www.npmjs.com/package/goods-crawling)
> 爬取amazon/bestbuy/costco/6pm 的商品详情 

### Setup

```
$ npm install
```

### Test

- amazon.com
```
$ node ./test/amazon.js
```

- bestbuy.com
```
$ node ./test/bestbuy.js
```

- 6pm.com
```
$ node ./test/sixpm.js
```

- costco.com
```
$ node ./test/costco.js
```

or checkout `./test/test.js`

### Usage

```js
const {fetchGoodsData} = require('goods-crawling');


let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B00BOR6I68/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike';

fetchGoodsData(url, {}, function(err, data){
    if(err){
        console.err("Error:" + err)
        return
    }
    console.log(data)
});


```