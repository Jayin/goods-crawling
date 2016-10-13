### setup

```
$ npm install
```

### test

- amazon.com
```
$ node ./src/amazon.js
```

- bestbuy.com
```
$ node ./src/bestbuy.js
```

- 6pm.com
```
$ node ./src/sixpm.js
```

- costco.com
```
$ node ./src/costco.js
```

or checkout `./src/test.js`

### useage

```js
const fetchGoodsData = require('goods-crawling');


let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B00BOR6I68/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike';

fetchGoodsData(url, function(err, data){
    if(err){
        console.err("Error:" + err)
        return
    }
    console.log(data)
});


```