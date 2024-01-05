const mongoose = require("mongoose");

const ExchangeProductSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    modal: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "exchange",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("exchangeproducts", ExchangeProductSchema);
