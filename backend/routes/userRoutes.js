const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/profile", isAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;