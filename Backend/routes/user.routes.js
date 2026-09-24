const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Frist name must be at least 3 characters or more"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have 6 characters or more"),
  ],
  userController.registerUser,
);

module.exports = router;
