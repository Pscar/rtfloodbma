import mongoose from 'mongoose'

const RainSchema = new mongoose.Schema({
  id: String,
  rain_24h: String,
  rainfall_datetime: String,
  station_type: String,
  agency: {
    agency_name: {
      th: String,
      en: String,
      jp: String,
    },
    agency_shortname: {
      th: String,
      en: String,
      jp: String,
    }
  },
  geocode: {
    warning_zone: String,
    area_code: String,
    area_name: {
      th: String
    },
    amphoe_name: {
      th: String
    },
    tumbon_name: {
      th: String
    },
    province_code: String,
    province_name: {
      th: String
    }
  },
  station: {
    id: String,
    tele_station_name: {
      th: String
    },
    tele_station_lat: String,
    tele_station_long: String,
    tele_station_oldcode: String,
    tele_station_type: String,
    sub_basin_id: String
  },
  basin: {
    id: String,
    basin_code: String,
    basin_name: {
      th: String,
      en: String
    }
  },
  _id: String
});

export default mongoose.models.Rain || mongoose.model('rains', RainSchema)
