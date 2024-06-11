const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
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
      // required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "Available",
    },
    listFor: String,
    // For products when placed for auction
    auctionDuration: Date,
    auctionStartingBid: String,
    auctionQuantity: String,
    bids: [
      {
        bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        bidderName: String,
        bidPrice: Number,
      },
    ],
    auctionClosed: { type: Boolean, default: false },
    auctionWinner: {
      bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      bidderName: String,
      bidPrice: Number,
    },
    inTheStore: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  { ignoreUndefined: true }
);

module.exports = mongoose.model("products", ProductSchema);
