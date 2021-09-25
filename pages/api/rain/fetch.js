import axios from 'axios';
import dbConnect from '../../../utils/dbConnect';
import Rain from '../../../models/Rain';

const get_rain = async () => {
  try {

    const req = axios.get('http://api2.thaiwater.net:9200/api/v1/thaiwater30/public/rain_24h');
    const res = await req;
    const datas = res.data.data;

    let data = datas.filter(data => data.geocode.amphoe_name.th === 'ทุ่งสง');

    for (let item of data) {
      item._id = `${item.id}_${item.station.id}`;
    }

    return data;
  } catch (error) {
    console.log(error)
  }

}
const update_rain = async () => {

  let get_rains = await get_rain();

  for (let item of get_rains) {
    const res_rains = await Rain.updateOne({ _id: item._id }, item, { upsert: true });
    res_rains.n;
    res_rains.nModified;
  }
  
  return get_rains
}

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        /* find all the data in our database */
        const update_rains = await update_rain()
        res.status(200).json({ success: true, data: update_rains })
      } catch (error) {
        console.log("catch", error)
        res.status(400).json({ success: false })
      }
      break
    default:
      console.log("default")
      res.status(400).json({ success: false })
      break
  }

}



