import dbConnect from '../../../utils/dbConnect';
import Kml from '../../../models/Kml';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        /* find all the data in our database */
        const kmls = await Kml.find({})
        res.status(200).json({ success: true, data: kmls })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
