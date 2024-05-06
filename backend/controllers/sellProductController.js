const Product = require("../models/SellProduct/Product");

// Create new Sell Product
exports.createNewSellProduct = async (req, res) => {
  console.log("Posting Product");
  console.log(req.body);
  let product = req.body;

  // Incase for Bidding: Set Auction Duration
  if (product.auctionDuration) {
    product.auctionDuration = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + parseInt(product.auctionDuration)
    );
  }

  // Store Product
  const newProduct = new Product(product);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get All Products: Displays all public products
exports.getProductsListedFor = async (req, res) => {
  try {
    console.log("Listed for: ");
    console.log(req.params);
    // Find all products list for Rent, Bidding etc, Exclude current user products
    const data = await Product.find({
      userId: { $ne: req.params.userId }, // Exclude products owned by the current user
      listFor: req.params.listFor,
    }).sort({ createdAt: -1 });

    console.log("Bid:");
    console.log(data);

    // Response
    res.status(200).json({
      status: "Success",
      message: "Public Rental Products",
      results: data.length,
      data,
    });
    // res.status(200).json({
    //   allProducts: allProducts,
    // });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
