const express = require("express");

const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  markProductSold,
} = require("../controllers/productController");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);

router.get("/my", isAuthenticated, getMyProducts);

router.patch(
  "/:id/sold",
  isAuthenticated,
  markProductSold
);
router.get("/:id", getProductById);

router.post("/", isAuthenticated, createProduct);

module.exports = router;