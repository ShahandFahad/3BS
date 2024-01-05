const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    notifyBy: {
      type: String,
    },
    text: {
      type: String,
    },
    status: {
      type: String,
      default: "unread",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", NotificationSchema);
