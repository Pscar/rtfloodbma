let products = require('./product-rice.json');
products = products.filter((item)=>(item.product_id[0]=="R"));
products.map((item)=>{
    let product_id = item.product_id;
    try {        
        let rice = require('./rice/'+product_id+'.json');
        if(rice.price_list){
            item.price = rice.price_list.pop();
        }else{
            item.price = null;
        }
        return item;
    } catch (error) {
        item.price = null;
        return item;        
    }
    
});
console.log(products);