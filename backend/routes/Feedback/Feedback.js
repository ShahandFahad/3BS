const Feedback = require("../../models/Feedback/Feedback");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../UserRoute/verifyToken");
// Add review
router.post("/add", async (req, res) => {
  const newFeedback = new Feedback(req.body);
  try {
    const feedbackProduct = await newFeedback.save();
    res.status(200).json(feedbackProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all revews of specific user

router.get("/all/:userId", async (req, res) => {
  try {
    const feedbackProducts = await Feedback.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(feedbackProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
