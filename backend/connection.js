const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Set path to environment variable file
dotenv.config({ path: "./.env" });

// Create Database Connection
// const connectToDatabase = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.DB_URI);
//     console.log("connected Successfully!!");
//   } catch (err) {
//     console.log("connection failed");
//   }
// };

// DB connection
const connString = process.env.DB_URI;

// Create Database Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(connString, { family: 4 });
    console.log("DB Connection Successfull !!!");
  } catch (err) {
    console.log("DB CONNECTION FAILED");
  }
};

module.exports = connectToDatabase;
