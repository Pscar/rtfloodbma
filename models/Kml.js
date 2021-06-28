import mongoose from 'mongoose'

const KmlSchema = new mongoose.Schema({
  _id: Number,
  input: {
    rains: Object,
    waters: Object,
    dem: Object
  },
  center_of_map: {
    longitude: String,
    latitude: String,
  },
  polygons: {
    name: String,
    coordinates: [
      {
        longitude: String,
        latitude: String,
      }
    ]
  },
  boundary: {
    coordinates: [
      {
        longitude: String,
        latitude: String,
      }
    ]
  },
});
module.exports = mongoose.models.Kml || mongoose.model('Kml', KmlSchema)
