// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../../utils/dbConnect';
import Water from '../../../models/Water';

export default async function handler(req, res) {
  const { method } = req
  const { slug } = req.query
  const y = slug[0]
  const m = slug[1]
  const d = slug[2]
  const regex = new RegExp(`${y}-${m}-${d}`);
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        /* find all the data in our database */
        const rains = await Water.find({ "waterlevel_datetime": regex })
        res.status(200).json({ success: true, data: rains })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
