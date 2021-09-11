import dbConnect from '../../../utils/dbConnect';
import Water from '../../../models/Water';

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  console.log(id)

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const waters = await Water.findById(id).exec();
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
