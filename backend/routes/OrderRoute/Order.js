const router = require("express").Router();
const Order = require("../../models/Order/Order");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../UserRoute/verifyToken");

// Add transaction

router.post("/add", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the transactions
router.get("/all", async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the transactions  of the specific user
router.get("/all/:userId", async (req, res) => {
  try {
    const allOrders = await Order.find({
      userId: req.params.userId,
    });
    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get profile Stats
router.get("/total/:userId", async (req, res) => {
  try {
    const allOrders = await Order.aggregate([
      {
        $match: {
          userId: req.params.userId,
          status: "Sold", // Convert the user ID string to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);
    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Change  product Status
router.put("/edit/status/:productId", async (req, res) => {
  try {
    const updatedStatus = await Order.findOneAndUpdate(
      {
        productId: req.params.productId,
      },
      {
        $set: {
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.status(201).json(updatedStatus);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
