const ExchangeProduct = require("../../models/ExchangeProduct/ExchangeProduct");
const User = require("../../models/User");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../UserRoute/verifyToken");
// Add product
router.post("/exchange/add", verifyToken, async (req, res) => {
  const newProduct = new ExchangeProduct(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all products

router.get("/exchange/all", async (req, res) => {
  try {
    const allProducts = await ExchangeProduct.find().sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Get Recent Products
router.get("/exchange/recentproducts", async (req, res) => {
  try {
    const recentProducts = await ExchangeProduct.find()
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json(recentProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all products of a specific user
router.get("/exchange/all/:userId", async (req, res) => {
  try {
    // allproducts
    const allProducts = await ExchangeProduct.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });
    // fetch exchange products
    const exchangeProducts = await ExchangeProduct.find({
      userId: req.params.userId,
      status: "exchange",
    }).sort({ createdAt: -1 });
    // fetch exchanged products
    const exchangedProducts = await ExchangeProduct.find({
      userId: req.params.userId,
      status: "exchanged",
    }).sort({ createdAt: -1 });
    res.status(200).json({
      allProducts: allProducts,
      exchangeProducts: exchangeProducts,
      exchangedProducts: exchangedProducts,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get single Product Details of specific user
router.get("/exchange/details/:productId", async (req, res) => {
  try {
    const details = await ExchangeProduct.findById({
      _id: req.params.productId,
    });
    const by = await User.findById(details.userId);
    const { otpCode, password, ...others } = by._doc;

    res.status(200).json({ details: details, By: others });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Related Products
router.get("/exchange/relatedproducts", async (req, res) => {
  const qCategory = req.query.category;
  try {
    const relatedProducts = await ExchangeProduct.find({
      category: {
        $in: [qCategory],
      },
    })
      .limit(5)
      .sort({ createdAt: -1 });
    res.status(200).json(relatedProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update a product
router.put("/exchange/edit/:productId", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await ExchangeProduct.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Change  product Status
router.put(
  "/exchange/edit/status/:productId",
  verifyToken,
  async (req, res) => {
    try {
      const updatedStatus = await ExchangeProduct.findByIdAndUpdate(
        req.params.productId,
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
  }
);

// Delete a product
router.delete("/exchange/delete/:productId", verifyToken, async (req, res) => {
  try {
    const deleteProduct = await ExchangeProduct.findByIdAndDelete(
      req.params.productId
    );
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Searching products
router.get("/exchange/:productId/find", async (req, res) => {
  try {
    const searchProducts = await ExchangeProduct.find({
      $or: [
        {
          category: { $regex: new RegExp(".*" + req.query.search + ".*", "i") },
        },
        {
          title: { $regex: new RegExp(".*" + req.query.search + ".*", "i") },
        },
        {
          description: {
            $regex: new RegExp(".*" + req.query.search + ".*", "i"),
          },
        },
      ],
    });

    res.status(200).json(searchProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Searching products location Base
router.get("/exchange/findbylocation", async (req, res) => {
  try {
    const searchProducts = await ExchangeProduct.find({
      $or: [
        {
          location: {
            $regex: new RegExp(".*" + req.query.location + ".*", "i"),
          },
        },
      ],
    });
    res.status(200).json(searchProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
