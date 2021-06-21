// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../utils/dbConnect';
import Rain from '../../models/Rain';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        /* find all the data in our database */
        const rains = await Rain.find({})
        res.status(200).json({ success: true, data: rains })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
