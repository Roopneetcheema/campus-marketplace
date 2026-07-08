const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middleware/authMiddleware");

const {
  getProfile,
  getSellerProfile,
} = require("../controllers/userController");

router.get(
  "/profile",
  isAuthenticated,
  getProfile
);

router.get(
  "/:id",
  isAuthenticated,
  getSellerProfile
);

module.exports = router;