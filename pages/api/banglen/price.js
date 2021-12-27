// 

export default async function handler(req, res) {
    let { product_id, from_date , to_date } = req.query;
    product_id = product_id ? product_id : "R11001";
    from_date= from_date ? from_date : "2021-01-01";
    to_date= to_date ? to_date : "2021-01-31";
    console.log(product_id, from_date, to_date );
    // const url = "https://dataapi.moc.go.th/gis-product-prices?product_id="+product_id+"&from_date="+from_date+"&to_date="+to_date;
    const url = "http://localhost:3000/json/rice/"+product_id+".json";
    let promiseA = await fetch(url);
    let data = await promiseA.json();
    // let filtered_data = data.waterlevel_data.data.filter(function (item) {
    //     return item.geocode.province_name.th == "นครปฐม";
    // });
    res.status(200).json(data);
    // res.status(200).send("Hello World");
}