const express = require("express");
const {
  getAllProducts,
  getAProductById,
  updateProducts,
  deleteProducts,
} = require("../controllers/productsController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:_id", getAProductById);

router.put("/:_id", updateProducts);
router.delete("/:_id", deleteProducts);

module.exports = router;
