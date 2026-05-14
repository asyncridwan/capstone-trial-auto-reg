const { body } = require("express-validator")

exports.registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least 1 number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least 1 special character (!@#$%^&*)")
]



exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
]