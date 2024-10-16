const Product = require("../models/productsModel");

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error while cratingthe product");
  }
};

// get a single products
const getAProductById = async (req, res) => {
  const id = req.params._id
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error getting a product");
  }
};

// update a product
const updateProducts = async (req, res) => {
  try {
    const productId = req.params._id;
    const updatedProduct = req.body;
    const result = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product has been updated successfully",product:result });
  } catch (error) {
    console.error(error);
  }
};

// derlete a product
const deleteProducts = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params._id);
    res.status(200).json("Product has been deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json("Error while deleting the product");
  }
};

module.exports = {
  getAllProducts,
  getAProductById,
  updateProducts,
  deleteProducts,
};
