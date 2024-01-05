const mongoose = require("mongoose");

// Coversation Schema
const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    feedbackById: {
      type: String,
      required: true,
    },
    feedbackByUsername: {
      type: String,
      required: true,
    },
    feedbackByPic: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
