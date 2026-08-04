const express = require("express");
const verifyToken = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to NextPrep Dashboard",
    user: req.user,
  });
});

module.exports = router;
