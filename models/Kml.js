import mongoose from 'mongoose'

const KmlSchema = new mongoose.Schema({
  center_of_map: {
    longitude: Number,
    latitude: Number,
  },
  polygons: {
    name: Number,
    coordinate: [
      {
        longitude: Number,
        latitude: Number,
      }
    ]
  },
  boundary: {
    longitude: Number,
    latitude: Number,
  },
  _id: String
});
module.exports = mongoose.models.Kml || mongoose.model('Kml', KmlSchema)
