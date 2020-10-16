const express = require("express");
const router = express.Router();
const { authorise } = require("../middleware/auth_middleware");

router.get("/", (req, res) => {
  // res.send("welcome");
  res.render("home");
});

router.get("/dashboard", authorise, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
