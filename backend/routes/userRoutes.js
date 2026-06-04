const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middleware/authMiddleware");

const {
  getProfile,
} = require("../controllers/userController");

router.get(
  "/profile",
  isAuthenticated,
  getProfile
);

module.exports = router;