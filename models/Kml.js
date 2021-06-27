import mongoose from 'mongoose'

const KmlSchema = new mongoose.Schema({
  center_of_map: {
    longitude: String,
    latitude: String,
  },
  polygons: {
    name: String,
    coordinate: [
      {
        longitude: String,
        latitude: String,
      }
    ]
  },
  boundary: {
    longitude: String,
    latitude: String,
  },
  _id: String
});
module.exports = mongoose.models.Kml || mongoose.model('Kml', KmlSchema)
