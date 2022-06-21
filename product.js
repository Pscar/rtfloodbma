// https://dataapi.moc.go.th/gis-products?keyword=%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7&sell_type=wholesale
const fs = require('fs');
// import fetch from "node-fetch";
const fetch = require('node-fetch');
async function product() {
    // const url = "https://dataapi.moc.go.th/gis-products?keyword=ข้าว&sell_type=wholesale";

    const url = "http://localhost:3000/json/product-rice.json";
    let promiseA = await fetch(encodeURI(url));
    let data = await promiseA.json();
    let filtered_data = data.filter(function (item) {
        return item.category_name.includes("ข้าว");
    });
    let count = 1 ;
    for (let f of filtered_data) {
        // if(count < 64 ) continue;
        // console.log("HEY : ", f.product_id, f.product_name);
        const url2 = "https://dataapi.moc.go.th/gis-product-prices?product_id="+f.product_id+"&from_date=2022-05-01&to_date=2022-06-30";
        let promiseA2 = await fetch(url2);
        let data2 = await promiseA2.json();
        // fs.writeFileSync("./json/"+f.product_id+".json", JSON.stringify(data2) )
        fs.writeFileSync("public/json/rice/"+f.product_id+".json", JSON.stringify(data2) )
        console.log(count++, filtered_data.length , data2.product_name);
        // break;

    }
    // res.status(200).json(filtered_data);
}
product()