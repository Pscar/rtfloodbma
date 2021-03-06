/* This is a database connection function*/
import mongoose from 'mongoose'
/* creating connection object*/
const connection = {} 

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState;
  console.log("connection.isConnected", connection.isConnected);
  
}

export default dbConnect
