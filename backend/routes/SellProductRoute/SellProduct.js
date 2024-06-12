const Product = require("../../models/SellProduct/Product");
const User = require("../../models/User");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../../routes/UserRoute/verifyToken");

// Sell Product Controller
const sellProductController = require("../../controllers/sellProductController");

// Add product &
// Patch a bid to the existing product
router.route("/sell/add").post(
  // verifyToken,
  sellProductController.createNewSellProduct
);

router
  .route("/sell/add/:productId")
  .patch(sellProductController.placeBid)
  .put(sellProductController.updateProductDocument);

// Get all rental products list for rent, buyer request etc. For public, exclude user id
router.get(
  "/product-listed-for/all/:userId/:listFor",
  // verifyToken,
  sellProductController.getProductsListedFor
);

// router.post("/sell/add", verifyToken, async (req, res) => {
//   console.log("Posting Product");
//   console.log(req.body);
//   const newProduct = new Product(req.body);
//   try {
//     const savedProduct = await newProduct.save();
//     res.status(200).json(savedProduct);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

// Get all products

router.get("/sell/all", async (req, res) => {
  try {
    const allProducts = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all products of specific user

// router.get("/sell/all/:userId", async (req, res) => {
//   try {
//     const allProducts = await Product.find({ userId: req.params.userId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(allProducts);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });
// Get all Avaialable products

router.get("/sell/available/:userId", async (req, res) => {
  try {
    const allProducts = await Product.find({
      userId: req.params.userId,
      status: "Available",
    }).sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all sold products

router.get("/sell/sold/:userId", async (req, res) => {
  try {
    const allProducts = await Product.find({
      userId: req.params.userId,
      status: "Sold",
    }).sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all pending products

router.get("/sell/pending/:userId", async (req, res) => {
  try {
    const allProducts = await Product.find({
      userId: req.params.userId,
      status: "Pending",
    }).sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Get Recent Products
router.get("/recentproducts", async (req, res) => {
  try {
    const recentProducts = await Product.find({ status: "Available" })
      .limit(8)
      .sort({ createdAt: -1 });
    res.status(200).json(recentProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all products of a specific user
router.get("/sell/all/:userId", async (req, res) => {
  try {
    // allproducts
    const allProducts = await Product.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });
    // fetch sold products
    const soldProducts = await Product.find({
      userId: req.params.userId,
      status: "Sold",
    }).sort({ createdAt: -1 });
    // fetch available products
    const availableProducts = await Product.find({
      userId: req.params.userId,
      status: "Available",
    }).sort({ createdAt: -1 });
    // fetch available products
    const pendingProducts = await Product.find({
      userId: req.params.userId,
      status: "Pending",
    }).sort({ createdAt: -1 });
    res.status(200).json({
      allProducts: allProducts,
      soldProducts: soldProducts,
      availableProducts: availableProducts,
      pendingProducts: pendingProducts,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get single Product Details of specific user
router.get("/sell/details/:productId", async (req, res) => {
  try {
    const details = await Product.findById({ _id: req.params.productId });

    const by = await User.findById(details.userId);
    const { otpCode, password, ...others } = by._doc;

    res.status(200).json({ details: details, By: others });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Related Products
router.get("/sell/relatedproducts", async (req, res) => {
  const qCategory = req.query.category;
  try {
    const relatedProducts = await Product.find({
      category: {
        $in: [qCategory],
      },
      status: "Available",
    })
      .limit(5)
      .sort({ createdAt: -1 });
    res.status(200).json(relatedProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update a product
router.put("/sell/edit/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
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
router.put("/sell/edit/status/:productId", verifyToken, async (req, res) => {
  console.log("Edit Status Product");
  console.log(req.params);
  try {
    const updatedStatus = await Product.findByIdAndUpdate(
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
});

// Delete a product
router.delete("/sell/delete/:productId", verifyToken, async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.productId);
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Searching products
router.get("/sell/find", async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  try {
    // const searchProducts = await Product.find({
    //   status: "Available",
    //   $or: [
    //     {
    //       location: {
    //         $regex: new RegExp(".*" + req.query.location + ".*", "i"),
    //       },
    //     },
    //     {
    //       title: { $regex: new RegExp(".*" + req.query.search + ".*", "i") },
    //     },
    //   ],
    // });

    const { location, search: title } = req.query;

    let query = {
      status: "Available",
    };

    if (location && title) {
      query.$or = [
        { location: { $regex: new RegExp(".*" + location + ".*", "i") } },
        { title: { $regex: new RegExp(".*" + title + ".*", "i") } },
      ];
    } else if (location) {
      query.location = { $regex: new RegExp(".*" + location + ".*", "i") };
    } else if (title) {
      query.title = { $regex: new RegExp(".*" + title + ".*", "i") };
    }

    const searchProducts = await Product.find(query).exec();

    // console.log("Results: ", searchProducts);

    res.status(200).json(searchProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Searching products location Base
router.get("/sell/findbylocation", async (req, res) => {
  try {
    const searchProducts = await Product.find({
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
