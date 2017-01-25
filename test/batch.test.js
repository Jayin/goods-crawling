
/**
 * 批量测试请求测试，测试：
 * 1. amazon 是否会错误返回非手机网页
 * 2. 爬虫失败原因：网络连接 反爬虫等
 *
 */
const {fetchGoodsData} = require('../');


let url = 'https://www.amazon.com/Nike-Rosherun-Black-Anthracite-Running/dp/B005ODHIDK/ref=sr_1_2?ie=UTF8&qid=1472541714&sr=8-2&keywords=nike&th=1&psc=1';


for(let i=0; i < 100; i++){
    
    fetchGoodsData(url, {show: true},function(err, data){
        console.log('处理完毕: 序号' + i);
        if(err){
            console.log("Error:" + err)
            return
        }
        
        if(data.title == ''){
            if(data.price !== ''){
                console.log(i +': amazon 返回Wap页')
            }
            if(data.price == ''){
                console.log(i +': 爬虫失败')
            }
            
        }
        // console.log(JSON.stringify(data,null, 4))
    });

}

