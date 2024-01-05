const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    condition: {
      type: String,
    },
    price: {
      type: Number,
    },
    photo: {
      type: String,
    },
    status: {
      type: String,
    },
    belongsToId: {
      type: String,
    },
    belongsToPicture: {
      type: String,
    },
    belongsToName: {
      type: String,
    },
    belongsToDescription: {
      type: String,
    },
    belongsToLevel: {
      type: Number,
    },
    belongsToRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", TransactionSchema);
