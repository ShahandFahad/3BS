const mongoose = require("mongoose");

// Create Database Connection
const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI);
    console.log("connected Successfully!!");
  } catch (err) {
    console.log("connection failed");
  }
};

module.exports = connectToDatabase;
