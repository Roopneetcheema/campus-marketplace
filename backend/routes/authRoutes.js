const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/failure",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/home");
  }
);

router.get("/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Only @thapar.edu accounts are allowed",
  });
});

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  res.json({
    success: true,
    user: req.user,
  });
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
});

module.exports = router;