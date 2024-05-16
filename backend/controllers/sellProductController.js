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

// Place bid on products
exports.placeBid = async (req, res) => {
  try {
    console.log("Placing a bid on Product");
    console.log(req.body);
    const { productId } = req.params;
    // Mogoose: Updating Embedded Array Documents
    /**
     * Find the product by id
     * Then push the new object in the bids array
     */
    const newBid = await Product.findOneAndUpdate(
      { _id: productId },
      { $push: { bids: req.body } },
      { new: true } // Return the updated document
    );
    // Response
    res.status(200).json({ status: "Success", message: "Bid Placed", newBid });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Update Product document for bid winner and closing bid
exports.updateProductDocument = async (req, res) => {
  try {
    console.log("Updating Product Document");
    console.log(req.body);
    const { productId } = req.params;
    const { auctionClosed, auctionWinner } = req.body;

    /**
     * Find the product by id
     * Update the fields
     */
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { auctionClosed: auctionClosed, auctionWinner: auctionWinner },
      { new: true } // Return the updated document
    );
    // Response
    res
      .status(200)
      .json({ status: "Success", message: "Product Updated", updatedProduct });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get All Products: Displays all public products
exports.getProductsListedFor = async (req, res) => {
  try {
    // console.log("Listed for: ");
    // Find all products list for Rent, Bidding etc, Exclude current user products
    const data = await Product.find({
      userId: { $ne: req.params.userId }, // Exclude products owned by the current user
      listFor: req.params.listFor,
    }).sort({ createdAt: -1 });

    // console.log("Bid:");
    // console.log(data);

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
