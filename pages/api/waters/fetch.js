import axios from 'axios';
import dbConnect from '../../../utils/dbConnect';
import Water from '../../../models/Water';

const get_water = async () => {
  try {

    const req = axios.get('http://api2.thaiwater.net:9200/api/v1/thaiwater30/public/waterlevel_load');
    const res = await req;
    const datas = res.data.waterlevel_data.data;

    let data = datas.filter(data => data.station.tele_station_name.th === 'ทุ่งสง');

    for (let item of data) {
      item._id = `${item.id}_${item.station.id}`;
    }
    // console.log(data);
    return data;

  } catch (error) {
    console.log(error)
  }
}
const update_water = async () => {
  let get_waters = await get_water()

  for (let item of get_waters) {
    const res = await Water.updateOne({ _id: item._id }, item, { upsert: true });
    res.n;
    res.nModified;
  }
  return get_waters
}

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const update_waters = await update_water()
        /* find all the data in our database */
        res.status(200).json({ success: true, data: update_waters })
      } catch (error) {
        console.log("err", error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}