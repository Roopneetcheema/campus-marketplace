const express = require("express");

const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", isAuthenticated, createProduct);

module.exports = router;