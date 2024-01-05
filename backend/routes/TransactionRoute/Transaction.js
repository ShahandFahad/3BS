const router = require("express").Router();
const Transaction = require("../../models/Transaction/Transaction");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../../routes/UserRoute/verifyToken");

// Add transaction

router.post("/add", async (req, res) => {
  const newTransaction = new Transaction(req.body);
  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the transactions
router.get("/all", async (req, res) => {
  try {
    const allTransactions = await Transaction.find();
    res.status(200).json(allTransactions);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the transactions  of the specific user
router.get("/all/:userId", async (req, res) => {
  try {
    const allTransactions = await Transaction.find({
      userId: req.params.userId,
    });
    res.status(200).json(allTransactions);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Change  product Status
router.put("/edit/status/:productId", async (req, res) => {
  try {
    const updatedStatus = await Transaction.findOneAndUpdate(
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
// // Get profile Stats
// router.get("/stats/:userId", async (req, res) => {
//   const startOfDay = new Date();
//   startOfDay.setHours(0, 0, 0, 0); // Set time to the start of the day

//   try {
//     const data = await ProfileViews.aggregate([
//       {
//         $match: {
//           userId: req.params.userId, // Convert the user ID string to ObjectId
//         },
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//           },
//           count: { $sum: 1 },
//         },
//       },
//     ]).sort({ createdAt: -1 });
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

module.exports = router;
