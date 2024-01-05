const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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

    buyerPicture: {
      type: String,
    },
    buyerName: {
      type: String,
    },
    buyerDescription: {
      type: String,
    },
    buyerLevel: {
      type: String,
    },
    buyerRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
