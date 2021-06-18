
const DB_USER = 'rtfloodbma';
const PASSWORD = encodeURIComponent('weather2Project');

module.exports = {
  env: {
    MONGO_URI: `mongodb+srv://rtfloodbma:weather2Project@cluster0.198m3.mongodb.net/rtfloodbma?retryWrites=true&w=majority`
  }
}