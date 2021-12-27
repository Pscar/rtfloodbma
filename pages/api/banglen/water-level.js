// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    let promiseA = await fetch("http://api-v3.thaiwater.net/api/v1/thaiwater30/public/waterlevel_load");
    let data = await promiseA.json();
    let filtered_data = data.waterlevel_data.data.filter(function (item) {
        return item.geocode.province_name.th == "นครปฐม";
    });
    res.status(200).json(filtered_data);
  }