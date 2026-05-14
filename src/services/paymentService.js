const Payment =
require("../models/Payments")

const generateTransactionRef =
require("../utility/generateTransactionRef")

exports.initializePayment =
async (
  userId,
  vehicleId,
  amount,
  purpose
) => {

  const payment =
    await Payment.create({

      user: userId,

      vehicle: vehicleId,

      amount,

      purpose,

      transactionRef:
        generateTransactionRef()
    })

  return payment
}

exports.verifyPayment =
async (paymentId) => {

  const payment =
    await Payment.findById(paymentId)

  if (!payment) {
    throw new Error(
      "Payment not found"
    )
  }

  payment.status = "paid"

  await payment.save()

  return payment
}