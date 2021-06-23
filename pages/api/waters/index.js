import dbConnect from '../../../utils/dbConnect';
import Water from '../../../models/Water';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const waters = await Water.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: waters })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
