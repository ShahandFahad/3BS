const mongoose = require("mongoose");

const ProfileViews = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    viewer: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProfileViews", ProfileViews);
