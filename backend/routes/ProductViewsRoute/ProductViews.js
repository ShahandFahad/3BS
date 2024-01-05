const router = require("express").Router();

const ProductViews = require("../../models/ProductViews/ProductViews");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../UserRoute/verifyToken");

// Add product

router.post("/add", async (req, res) => {
  const newViewer = new ProductViews(req.body);
  //   check exist
  try {
    const check = await ProductViews.findOne({
      userId: req.body.userId,
      productId: req.body.productId,
      viewer: req.body.viewer,
    });
    if (check) {
      res.status(201).json("Already viewed");
    } else {
      const savedViews = await newViewer.save();
      res.status(200).json(savedViews);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// // Get all the viewers of all products
router.get("/allviews/:userId", async (req, res) => {
  try {
    const allViews = await ProductViews.find({ userId: req.params.userId });
    allViews && res.status(200).json(allViews);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the viewers of the specific user
router.get("/allviews/find/:productId", async (req, res) => {
  try {
    const allViews = await ProductViews.find({
      productId: req.params.productId,
    });
    allViews && res.status(200).json(allViews);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Get profile Stats
router.get("/stats/:userId", async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Set time to the start of the day

  try {
    const data = await ProductViews.aggregate([
      {
        $match: {
          userId: req.params.userId, // Convert the user ID string to ObjectId
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
