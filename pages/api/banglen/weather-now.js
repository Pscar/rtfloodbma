// https://dataapi.moc.go.th/gis-product-prices?product_id=P11001&from_date=2018-01-01&to_date=2018-02-28

const lat = "14.040191210782327";
const lon = "100.17229562558649";
// const part = "daily";
const part = "current";
const APIkey = "8b77bc404e99340e0ebdd43aa0078020";
const lang = "th";
const units = "metric";
// const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIkey}&lang=${lang}&units=${units}`;
const url = "http://localhost:3000/json/weather.json";
// https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
//ตัวอย่าง ICON IMG เอา icon code มาใส่เป็นชื่อไฟล์
// https://openweathermap.org/img/w/04d.png
export default async function handler(req, res) {
    // let { product_id, from_date , to_date } = req.query;
    // product_id = product_id ? product_id : "R11001";
    // from_date= from_date ? from_date : "2021-01-01";
    // to_date= to_date ? to_date : "2021-01-31";
    // console.log(product_id, from_date, to_date );
    // // const url = "https://dataapi.moc.go.th/gis-product-prices?product_id="+product_id+"&from_date="+from_date+"&to_date="+to_date;
    // const url = "http://localhost:3000/json/rice/"+product_id+".json";
    let promiseA = await fetch(url);
    let data = await promiseA.json();
    // let filtered_data = data.waterlevel_data.data.filter(function (item) {
    //     return item.geocode.province_name.th == "นครปฐม";
    // });
    res.status(200).json(data);
    // res.status(200).send("Hello World");
}