// https://dataapi.moc.go.th/gis-products?keyword=%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7&sell_type=wholesale
const fs = require('fs');
export default async function handler(req, res) {
    // const url = "https://dataapi.moc.go.th/gis-products?keyword=ข้าว&sell_type=wholesale";

    const url = "http://localhost:3000/json/product-rice.json";
    let promiseA = await fetch(encodeURI(url));
    let data = await promiseA.json();
    let filtered_data = data.filter(function (item) {
        return item.category_name.includes("ข้าว");
    });    
    res.status(200).json(filtered_data);
}