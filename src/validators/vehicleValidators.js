const { body } = require("express-validator")

exports.createVehicleValidator = [
  body("carModel")
    .notEmpty()
    .withMessage("Car model is required"),

  body("manufacturer")
    .notEmpty()
    .withMessage("Manufacturer is required"),

  body("year")
    .isInt({ min: 1900, max: 2030 })
    .withMessage("Invalid year")
]