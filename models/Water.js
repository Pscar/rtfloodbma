import mongoose from 'mongoose'

const WaterSchema = new mongoose.Schema({
  waterlevel_data: {
    id: String,
    waterlevel_datetime: String,
    waterlevel_m: String,
    waterlevel_msl: String,
    flow_rate: String,
    discharge: String,
    storage_percent: String,
    sort_order: String,
    station_type: String,
    situation_level: String,
  },
  agency: {
    id: String,
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
  basin: {
    id: String,
    basin_code: String,
    basin_name: {
      th: String,
      en: String,
    }
  },
  station: {
    id: String,
    tele_station_name: {
      th: String,
      en: String,
    },
    tele_station_lat: String,
    tele_station_long: String,
    tele_station_oldcode: String,
    tele_station_type: String,
    left_bank: String,
    right_bank: String,
    min_bank: String,
    ground_level: String,
    offset: String,
    sub_basin_id: String,
    agency_id: String,
    geocode_id: String,
    is_key_station: false,
    warning_level_m: String,
    critical_level_m: String,
    critical_level_msl: String
  },
  geocode: {
    area_code: String,
    area_name: {
      th: String,
    },
    amphoe_code: String,
    amphoe_name: {
      th: String,
    },
    tumbon_code: String,
    tumbon_name: {
      th: String,
    },
    province_code: String,
    province_name: {
      th: String,
    }
  },
  _id: String
});

export default mongoose.models.Water || mongoose.model('Water', WaterSchema);
