const Product = require("../models/SellProduct/Product");

// Create new Sell Product
exports.createNewSellProduct = async (req, res) => {
  console.log("Posting Product");
  console.log(req.body);
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
