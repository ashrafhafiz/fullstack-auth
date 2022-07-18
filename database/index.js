// external imports
const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB Server!");
  } catch (error) {
    console.log("Unable to connect to MongoDB Server!");
    console.error(error);
  }
}

module.exports = dbConnect;
