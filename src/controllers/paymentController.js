const paymentService =
require("../services/paymentService")
const emailService = require("../services/emailService")
const User = require("../models/User")
const Vehicle = require("../models/Vehicle")

exports.initializePayment =
async (req, res) => {

  try {

    const {vehicleId,amount,purpose} = req.body

    const payment =await paymentService.initializePayment(req.user.id,vehicleId,amount,purpose)
    res.status(201).json(payment)
} catch (error) {

    res.status(500).json({message: error.message})
  }
}

exports.verifyPayment =
async (req, res) => {
try {
    const payment =
      await paymentService.verifyPayment(
        req.params.paymentId
      )

    // Send email notification to user
    const user = await User.findById(payment.user)
    if (user) {
      await emailService.sendEmail(
        user.email,
        "Payment Verified",
        `Your payment of ₦${payment.amount} for ${payment.purpose} has been verified successfully. Transaction Reference: ${payment.transactionRef}`
      )
    }

    res.json(payment)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}